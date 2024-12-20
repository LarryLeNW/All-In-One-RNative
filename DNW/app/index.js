import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const startPage = () => {
    return (
        <View className={"flex-1 justify-center items-center"}>
            <ActivityIndicator size={"large"} color={"red"}></ActivityIndicator>
        </View>
    );
};

export default startPage;
