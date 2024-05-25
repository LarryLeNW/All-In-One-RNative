import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";

const ChatList = ({ userChats }) => {
    return (
        <View className="flex-1">
            <FlatList
                data={userChats}
                contentContainerStyle={{
                    paddingVertical: 25,
                }}
                keyExtractor={(item) => item.userId}
                showsVerticalScrollIndicator={true}
                renderItem={({ item, index }) => (
                    <ChatItem
                        data={item}
                        index={index}
                        lastItem={index + 1 === userChats.length}
                    />
                )}
            />
        </View>
    );
};

const ChatItem = ({ data, lastItem }) => {
    const router = useRouter();

    const openChatRoom = (item) => {
        router.push({ pathname: "/ChatRoom", params: item });
    };

    return (
        <TouchableOpacity
            onPress={() => openChatRoom(data)}
            className={`p-2 flex-row justify-between mx-4 items-center gap-3 mb-4 ${
                !lastItem && "border-b"
            }  border-neutral-200`}
        >
            <Image
                style={{
                    height: heightPercentageToDP(7),
                    aspectRatio: 1,
                    borderRadius: 100,
                }}
                className="border border-blue-400"
                source={data?.profileURL}
                contentFit="cover"
                transition={500}
            />
            <View className="flex-1 gap-1">
                <View className="flex-row justify-between">
                    <Text className="text-xl font-bold">{data.username}</Text>
                    <Text className="text-sm text-gray-400">{Date.now()}</Text>
                </View>
                <View>
                    <Text className="text-lg italic">Last message...</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ChatList;
