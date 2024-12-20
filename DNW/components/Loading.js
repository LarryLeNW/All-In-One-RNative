import LottieView from "lottie-react-native";
import React from "react";
import { Text, View } from "react-native";

const Loading = () => {
    return (
        <View className={`flex flex-1 justify-center items-center  w-full `}>
            <LottieView
                className="w-2/3 h-2/3  "
                source={require("../assets/loading.json")}
                autoPlay
                loop
            />
        </View>
    );
};

export default Loading;
