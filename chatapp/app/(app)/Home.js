import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import ChatList from "./ChatList";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Loading from "../../components/Loading";
import { getDocs, query, where } from "firebase/firestore";
import { usersRef } from "../../config/firebase.config";

function Home() {
    const { user } = useAuth();
    const router = useRouter();
    const [userChats, setUserChats] = useState([]);

    useEffect(() => {
        if (user?.userId) getUserChats();
    }, [user]);

    const getUserChats = async () => {
        const q = query(usersRef, where("userId", "!=", user?.userId));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data() });
        });
        setUserChats(data);
    };

    return (
        <View className="flex-1  h-[100%]  ">
            <StatusBar style="light" />
            {userChats.length > 0 ? (
                <ChatList userChats={userChats} />
            ) : (
                <View className="flex items-center flex-1  h-[100%] ">
                    <Loading size={"h-[100%]"} />
                </View>
            )}
        </View>
    );
}

export default Home;
