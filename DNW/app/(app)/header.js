import React from "react";
import { Platform, Text, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import blurHash from "../../utils/common";
import { Image } from "expo-image";
import { useAuth } from "../../context/authContext";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";
import MenuItem from "../../components/CustomMenuItem";
import {
    FontAwesome,
    MaterialIcons,
    SimpleLineIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
const ios = Platform.OS == "ios";
const Header = () => {
    const { top } = useSafeAreaInsets();
    const { user, logout } = useAuth();

    return (
        <View
            style={{ paddingTop: ios ? top : top + 10 }}
            className="flex-row justify-between px-5 bg-indigo-500 pb-6 rounded-b-sm shadow"
        >
            <View>
                <Text
                    style={{ fontSize: heightPercentageToDP(3) }}
                    className="font-medium text-white"
                >
                    Chào mừng {user?.user?.name}
                </Text>
            </View>
            <View>
                <Menu>
                    <MenuTrigger>
                        <Image
                            style={{
                                height: heightPercentageToDP(5.3),
                                aspectRatio: 1,
                                borderRadius: 100,
                            }}
                            source={user?.user?.avatar}
                            placeholder={blurHash}
                            contentFit="cover"
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions
                        customStyles={{
                            optionsContainer: {
                                borderBottomEndRadius: 10,
                                borderBottomStartRadius: 10,
                                borderTopStartRadius: 10,
                                borderCurve: "continuous",
                                marginTop: 40,
                                marginLeft: -20,
                                backgroundColor: "white",
                                shadowOpacity: 0.2,
                                shadowOffset: { width: 0, height: 0 },
                                width: 160,
                            },
                        }}
                    >
                        <MenuItem
                            text="Profile"
                            action={() => router.replace("Profile")}
                            value={null}
                            textColor={"text-blue-600"}
                            icon={
                                <FontAwesome
                                    name="user"
                                    size={24}
                                    color="blue"
                                />
                            }
                        />
                        <MenuItem
                            text="Logout"
                            action={logout}
                            value={null}
                            textColor={"text-red-600"}
                            icon={
                                <MaterialIcons
                                    name="logout"
                                    size={24}
                                    color="red"
                                />
                            }
                        />
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    );
};

export default Header;
