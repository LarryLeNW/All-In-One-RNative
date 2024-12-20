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
    const [email, setEmail] = useState("Khanh140204@gmail.com");
    const [password, setPassword] = useState("Huukhanh@091024$");
    const [isLoading, setIsLoading] = useState(false);
    const { changeLoginData } = useAuth();
    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                "https://dnwmediavietnam.com/api/v1/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );
            const data = await response.json();
            if (!data) return;

            Alert.alert(
                "Success",
                "Đăng nhập thành công, chào mừng " + data.user.name
            );
            changeLoginData(data);
        } catch (err) {
            Alert.alert("error", "Tài khoản hoặc mật khẩu sai...");
        }
        setIsLoading(false);
    };

    return isLoading ? (
        <Loading />
    ) : (
        <CustomKeyboard className="flex flex-col justify-center items-center">
            <StatusBar style="dark" />
            <View className="flex-1 gap-10 w-full justify-center items-center  h-full pt-10 ">
                <View className="w-full mt-5 mx-auto flex flex-row  items-center justify-center">
                    <Image
                        style={{ height: hp(8) }}
                        resizeMode="contain"
                        source={require("../assets/images/logo.png")}
                    />
                    <Text
                        className="text-red-600  "
                        style={{ fontSize: hp(3), fontWeight: "bold" }}
                    >
                        Sign In
                    </Text>
                </View>
                <View className="gap-5 w-full flex">
                    <View
                        style={{ height: hp(7) }}
                        className=" flex bg-neutral-100 flex-row  items-center gap-2 "
                    >
                        <Octicons name="mail" size={hp(2)} color="gray" />
                        <TextInput
                            onChangeText={(value) => setEmail(value)}
                            style={{ fontSize: hp(2) }}
                            placeholder="Enter your email..."
                            className="flex-1 font-semibold text-neutral-500 py-2 text-lg "
                            placeholderTextColor={"gray"}
                            value={email}
                        ></TextInput>
                    </View>
                    <View
                        style={{ height: hp(7) }}
                        className="flex bg-neutral-100 flex-row  items-center gap-2 "
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
                    <TouchableOpacity
                        style={{ height: hp(6.5) }}
                        className="bg-indigo-500 rounded-2xl justify-center items-center"
                        onPress={handleLogin}
                    >
                        <Text className="text-lg mx-auto text-white font-bold">
                            Đăng nhập
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
                    </View>
                </View>
            </View>
        </CustomKeyboard>
    );
}

export default SignIn;
