import React, { useEffect, useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import { useAuth } from "../../context/authContext";

const MessageList = ({ messages }) => {
    const lastViewRef = useRef(null);

    const scrollToViewLastMess = () => {
        setTimeout(() => {
            lastViewRef?.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    useEffect(() => {
        scrollToViewLastMess();
    }, [messages]);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 10 }}
            className="px-4"
            ref={lastViewRef}
        >
            {messages.map((message, index) => {
                return <MessageItem data={message} key={index} />;
            })}
        </ScrollView>
    );
};

const MessageItem = ({ data }) => {
    const { user } = useAuth();

    return (
        <View
            // ref={lastRef}
            className={`flex-row ${
                user.userId == data.userId
                    ? "ml-auto justify-end bg-blue-500 flex-row-reverse "
                    : "mr-auto justify-start "
            }  mb-3 border border-gray-400 p-2 rounded-xl min-w-fit max-w-[70%]`}
        >
            <Text
                className={`text-3xl   ${
                    user.userId == data.userId && "text-white"
                }`}
            >
                {data.text}
            </Text>
        </View>
    );
};

export default MessageList;
