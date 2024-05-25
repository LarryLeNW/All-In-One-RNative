import { AntDesign, Entypo, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomKeyboard from "../components/CustomKeyboard";
import Loading from "../components/Loading";
import { useAuth } from "../context/authContext";

function SignIn() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState("ngando@gmail.com");
    const [password, setPassword] = useState("123456");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);

        const response = await login(email, password);

        setIsLoading(false);
        if (!response.success) Alert.alert("Error", response.msg);
    };

    return isLoading ? (
        <Loading />
    ) : (
        <CustomKeyboard>
            <StatusBar style="dark" />
            <View className="flex-1 gap-10 w-full justify-center items-center  h-full pt-10">
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    className="w-full mt-5  mx-auto"
                >
                    <Text
                        className="text-blue-600 "
                        style={{ fontSize: hp(3), fontWeight: "bold" }}
                    >
                        Sign In
                    </Text>
                    <Image
                        style={{ height: hp(14) }} // Cung cấp width cho Image nếu cần
                        resizeMode="contain"
                        source={require("../assets/images/react-logo.png")}
                    />
                </View>
                <View className="gap-5 w-full">
                    <View
                        style={{ height: hp(7) }}
                        className="flex flex-row gap-4 px-4 bg-neutral-100 justify-center items-center rounded-2xl pb-4"
                    >
                        <Octicons name="mail" size={hp(2)} color="gray" />
                        <TextInput
                            onChangeText={(value) => setEmail(value)}
                            style={{ fontSize: hp(2) }}
                            placeholder="Enter your email..."
                            className="flex-1 font-semibold text-neutral-500"
                            placeholderTextColor={"gray"}
                            value={email}
                        ></TextInput>
                    </View>
                    <View
                        style={{ height: hp(7) }}
                        className="flex flex-row gap-4 px-4 bg-neutral-100 justify-center items-center rounded-2xl pb-4"
                    >
                        <Octicons name="lock" size={hp(2)} color="gray" />
                        <TextInput
                            onChangeText={(value) => setPassword(value)}
                            style={{ fontSize: hp(2) }}
                            placeholder="Enter your password..."
                            className="flex-1 font-semibold text-neutral-500"
                            placeholderTextColor={"gray"}
                            secureTextEntry={true}
                            value={password}
                        ></TextInput>
                    </View>

                    <Text className="text-lg text-red-600 font-bold text-right">
                        Forgot your password ?
                    </Text>
                    <TouchableOpacity
                        style={{ height: hp(6.5) }}
                        className="bg-indigo-500 rounded-2xl justify-center items-center"
                        onPress={handleLogin}
                    >
                        <Text className="text-3xl text-white font-bold">
                            Submit
                        </Text>
                    </TouchableOpacity>
                    <View className="gap-9">
                        <Text className="  font-semibold text-center">
                            Don't have an account?{" "}
                            <Text
                                className="text-orange-600"
                                onPress={() => router.push("SignUp")}
                            >
                                Sign Up
                            </Text>
                        </Text>
                        <View className="flex-row justify-around items-center ">
                            <View className="p-2 rounded-full border-2 border-orange-500">
                                <AntDesign
                                    name="google"
                                    size={40}
                                    color="orange"
                                />
                            </View>
                            <View className="p-2  rounded-full border-2 border-blue-500">
                                <Entypo
                                    name="facebook-with-circle"
                                    color={"blue"}
                                    size={40}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboard>
    );
}

export default SignIn;
