import React from "react";
import { Platform, View } from "react-native";
import { KeyboardAvoidingView, ScrollView } from "react-native";

const ios = Platform.OS == "ios";
const CustomKeyboard = ({ children }) => {
    return (
        <KeyboardAvoidingView
            behavior={ios ? "padding" : "height"}
            style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
            className="h-full w-full "
            keyboardVerticalOffset={90}
        >
            <ScrollView
                style={{ flex: 1 }}
                bounces={false}
                showsVerticalScrollIndicator={false}
                className="h-full w-full "
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CustomKeyboard;
