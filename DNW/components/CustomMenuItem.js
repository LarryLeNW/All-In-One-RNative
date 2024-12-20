import React from "react";
import { Text, View } from "react-native";
import { MenuOption } from "react-native-popup-menu";

const MenuItem = ({ text, action, value, icon, textColor }) => {
    return (
        <MenuOption onSelect={() => action(value)}>
            <View
                className={`px-6 py-1 flex-row justify-between items-center  `}
            >
                <Text className={`text-2xl font-bold ${textColor} `}>
                    {text}
                </Text>
                <Text>{icon}</Text>
            </View>
        </MenuOption>
    );
};

export default MenuItem;
