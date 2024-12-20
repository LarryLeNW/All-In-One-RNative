import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../../context/authContext";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Image } from "expo-image";

const Profile = () => {
    const { user } = useAuth();

    return (
        <View classname="flex-1  h-[100%]  gap-4 py-4 bg-neutral-300  ">
            <View classname="mx-auto flex justify-center">
                <Image
                    classname="mx-auto"
                    style={{
                        height: heightPercentageToDP(16),
                        aspectRatio: 1,
                        borderRadius: 100,
                    }}
                    source={user?.user?.avatar}
                    placeholder={blurHash}
                    contentFit="cover"
                    transition={500}
                />
                <Text>Profile</Text>
            </View>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({});
