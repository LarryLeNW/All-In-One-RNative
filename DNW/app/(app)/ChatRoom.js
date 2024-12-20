import { Feather, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import MessageList from "./MessageList";
import { useAuth } from "../../context/authContext";
import { formatChatRoom } from "../../utils/common";
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    Timestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase.config";

const ChatRoom = () => {
    const item = useLocalSearchParams();
    const router = useRouter();
    const { user } = useAuth(user);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        let roomId = formatChatRoom(user?.userId, item.userId);
        createRoomIfNotExit(roomId);
        const docRef = doc(db, "rooms", roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy("createdAt", "asc"));

        let unSub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map((doc) => {
                return doc.data();
            });
            setMessages([...allMessages]);
        });

        return unSub;
    }, []);

    const createRoomIfNotExit = async (roomId) => {
        try {
            await setDoc(doc(db, "rooms", roomId), {
                roomId,
            });
        } catch (error) {
            Alert.alert("Error Connect Room Chat", "Something went wrong...");
        }
    };

    const handleSendMessage = async () => {
        if (!message.trim()) {
            Alert.alert("Please !!!", "Please enter a message");
            return;
        }

        try {
            const roomId = formatChatRoom(user.userId, item.userId);
            const docRef = doc(db, "rooms", roomId);
            const messageRef = collection(docRef, "messages");

            const newDoc = await addDoc(messageRef, {
                userId: user.userId,
                text: message.trim(),
                profileURL: user.profileURL,
                senderName: user.username,
                createdAt: Timestamp.fromDate(new Date()),
            });

            if (newDoc.id) setMessage("");
        } catch (error) {
            Alert.alert("Error Send Chat", "Something went wrong...");
        }
    };

    return (
        <View>
            <Header infoConnect={item} router={router} />
            <View className="d-flex flex-col h-full">
                <View className="h-[85%]">
                    <MessageList messages={messages} />
                </View>
                <View className="h-[10%] d-flex flex-row justify-between items-center mx-4 bg-white border px-4 py-2 border-neutral-300 rounded-full ">
                    <TextInput
                        placeholder="Enter message..."
                        className=" text-lg  w-[90%]  "
                        value={message}
                        onChangeText={(value) => setMessage(value)}
                    />
                    <TouchableOpacity onPress={handleSendMessage}>
                        <FontAwesome name="send-o" size={28} color="blue" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const Header = ({ infoConnect, router }) => {
    return (
        <Stack.Screen
            options={{
                title: "",
                headerShadowVisible: false,
                headerLeft: () => (
                    <View className=" flex-row items-center gap-1 px-4 py-2 ">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Feather
                                name="arrow-left"
                                size={heightPercentageToDP(4)}
                                color="gray"
                            />
                        </TouchableOpacity>
                        <View className=" flex-row items-center gap-4 ">
                            <Image
                                style={{
                                    height: heightPercentageToDP(6),
                                    aspectRatio: 1,
                                    borderRadius: 100,
                                }}
                                className="border border-blue-400"
                                source={infoConnect?.profileURL}
                                contentFit="cover"
                                transition={500}
                            />
                            <Text className="text-lg font-bold ">
                                {infoConnect.username}
                            </Text>
                        </View>
                    </View>
                ),
                headerRight: () => {
                    return (
                        <View className="flex-row gap-6 items-center ">
                            <TouchableOpacity>
                                <Feather
                                    name="phone-call"
                                    size={heightPercentageToDP(3)}
                                    color="gray"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Feather
                                    name="video"
                                    size={heightPercentageToDP(3)}
                                    color="gray"
                                />
                            </TouchableOpacity>
                        </View>
                    );
                },
            }}
        />
    );
};

export default ChatRoom;
