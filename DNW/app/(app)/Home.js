import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useAuth } from "../../context/authContext";

function Home() {
    const { user } = useAuth();
    const router = useRouter();

    return (
        <View className="flex-1  h-[100%]  ">
            <Text>{user.user.name}</Text>
        </View>
    );
}

export default Home;
