import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../../context/authContext";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Image } from "expo-image";

const Profile = () => {
    const { user } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={user?.user?.avatar}
                    contentFit="cover"
                    transition={500}
                />
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "black" }}>Username : </Text>
                    <Text style={{ fontWeight: 600, color: "green" }}>
                        {user?.user?.name}
                    </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "black" }}>Email : </Text>
                    <Text style={{ fontWeight: 600, color: "green" }}>
                        {user?.user?.email}
                    </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "black" }}>Role : </Text>
                    <Text style={{ fontWeight: 600, color: "green" }}>
                        {user?.user?.role?.name}
                    </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "black" }}>Phone : </Text>
                    <Text style={{ fontWeight: 600, color: "green" }}>
                        {user?.user?.phone || "Chưa cập nhật"}
                    </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "black" }}>Address : </Text>
                    <Text style={{ fontWeight: 600, color: "green" }}>
                        {user?.user?.address || "Chưa cập nhật"}
                    </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "black" }}>Created At : </Text>
                    <Text style={{ fontWeight: 600, color: "orange" }}>
                        {user?.user?.detail?.join_date}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
    },
    content: {
        alignItems: "center",
        gap: 16,
    },
    image: {
        height: heightPercentageToDP(16),
        aspectRatio: 1,
        borderRadius: 100,
        borderColor: "green",
        borderWidth: 3,
    },
    text: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: "bold",
    },
});
