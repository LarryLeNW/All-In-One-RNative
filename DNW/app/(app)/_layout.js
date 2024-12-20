import { Stack } from "expo-router";
import Header from "./header";
export default function _layout() {
    return (
        <Stack>
            <Stack.Screen
                name="Home"
                options={{
                    header: () => <Header />,
                }}
            ></Stack.Screen>
            <Stack.Screen
                name="Profile"
                options={{
                    header: () => <Header />,
                }}
            ></Stack.Screen>
        </Stack>
    );
}
