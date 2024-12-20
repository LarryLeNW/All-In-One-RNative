import {
    AntDesign,
    Entypo,
    FontAwesome5,
    MaterialCommunityIcons,
    Octicons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Alert,
    Image,
    StatusBar,
    Text,
    TextInput,
    Touchable,
    TouchableOpacity,
    View,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../components/Loading";
import CustomKeyboard from "../components/CustomKeyboard";
import { useAuth } from "../context/authContext";

function SignUp() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("trinhlek4@gmail.com");
    const [password, setPassword] = useState("123456");
    const [avatar, setAvatar] = useState(
        "https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/454937946_1287576289289125_7897028907186830200_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG2E_NBXGpXpdyo1G8tIXqM-ct-fTXMnVb5y359NcydVla1aNYxVXwT4OefQQwm6CxACwryY6wb9jnO2NMnKFK7&_nc_ohc=IL-wCqmDgU4Q7kNvgHLVW9G&_nc_ht=scontent.fdad3-6.fna&oh=00_AYAl1JHAWqA06tztQgh0GgOwIJCVOI924uloCvdEJqSixA&oe=66CDFC26"
    );
    const [username, setUsername] = useState("Larry Le");
    const { register } = useAuth();

    const handleRegister = async () => {
        if (!(email && password && avatar && username)) {
            Alert.alert("Signup", "Please field all the fields...");
            return;
        }
        setIsLoading(true);

        let response = await register(email, password, username, avatar);
        setIsLoading(false);

        if (!response.success) Alert.alert("Error", response.msg);
    };

    return isLoading ? (
        <Loading />
    ) : (
        <CustomKeyboard>
            <StatusBar style="dark" />
            <View className="flex-1 gap-10 w-full justify-center items-center    pt-10  ">
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    className="w-full mt-5 mx-auto"
                >
                    <Text
                        className="text-blue-600 "
                        style={{ fontSize: hp(3), fontWeight: "bold" }}
                    >
                        Sign Up
                    </Text>
                    <Image
                        style={{ height: hp(14) }} // Cung cấp width cho Image nếu cần
                        resizeMode="contain"
                        source={require("../assets/images/react-logo.png")}
                    />
                </View>
                <View className="gap-5 w-full ">
                    <View
                        style={{ height: hp(7) }}
                        className="flex flex-row gap-4 px-4 bg-neutral-100 justify-center items-center rounded-2xl pb-4"
                    >
                        <FontAwesome5 name="user-alt" color="black" />
                        <TextInput
                            onChangeText={(value) => setUsername(value)}
                            style={{ fontSize: hp(2) }}
                            placeholder="Enter your username..."
                            className="flex-1 font-semibold text-neutral-500"
                            placeholderTextColor={"gray"}
                            value={username}
                        ></TextInput>
                    </View>

                    <View
                        style={{ height: hp(7) }}
                        className="flex flex-row gap-4 px-4 bg-neutral-100 justify-center items-center rounded-2xl pb-4"
                    >
                        <MaterialCommunityIcons
                            name="file-image-plus-outline"
                            color="black"
                        />
                        <TextInput
                            onChangeText={(value) => setAvatar(value)}
                            style={{ fontSize: hp(2) }}
                            placeholder="Enter your avatar..."
                            className="flex-1 font-semibold text-neutral-500"
                            placeholderTextColor={"gray"}
                            value={avatar}
                        ></TextInput>
                    </View>
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
                        onPress={handleRegister}
                    >
                        <Text className="text-3xl text-white font-bold">
                            Submit
                        </Text>
                    </TouchableOpacity>
                    <View className="gap-9">
                        <Text className="  font-semibold text-center">
                            You already an account ?{" "}
                            <Text
                                className="text-blue-600"
                                onPress={() => router.push("SignIn")}
                            >
                                Sign In Now
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </CustomKeyboard>
    );
}

export default SignUp;
