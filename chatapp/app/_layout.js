import { Slot, useRouter, useSegments } from "expo-router";
import { View } from "react-native";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";
const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (typeof isAuthenticated === "undefined") return;
        const inApp = segments[0] == "(app)";
        if (isAuthenticated && !inApp) {
            console.log("Navigating to Home");
            router.replace("Home");
        } else if (isAuthenticated == false) {
            console.log("Navigating to SignIn");
            router.replace("SignIn");
        }
    }, [isAuthenticated]);

    return <Slot />;
};

const RootLayout = () => {
    return (
        <MenuProvider>
            <AuthContextProvider>
                <MainLayout />
            </AuthContextProvider>
        </MenuProvider>
    );
};

export default RootLayout;
