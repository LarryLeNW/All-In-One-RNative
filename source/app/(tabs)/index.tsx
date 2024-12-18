import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useState } from 'react';
import { Audio } from 'expo-av';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const SongItem = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playSong = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../../assets/music/color_hour.mp3')
      );
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.container}>
        <Text style={styles.header}>Danh sách bài hát</Text>
        <SongItem title={'Song 1'} onPress={playSong} />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  itemContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
