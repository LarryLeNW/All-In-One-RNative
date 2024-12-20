import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import RenderHTML from "react-native-render-html";
import { useAuth } from "../../context/authContext";

const Event = () => {
    // const { user } = useAuth();
    // const [data, setData] = useState([]);
    // const [isLoading, setLoading] = useState(false);

    // useEffect(() => {
    //     const fetchEvents = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await fetch(
    //                 `https://dnwmediavietnam.com/api/v1/system-notifications`,
    //                 {
    //                     method: "GET",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         Authorization: "Bearer " + user.access_token,
    //                     },
    //                 }
    //             );
    //             const result = await response.json();
    //             setData(result.data || []);
    //         } catch (err) {
    //             Alert.alert("Warning", "Lỗi, " + err.toString());
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchEvents();
    // }, []);

    // const renderEventItem = ({ item }) => (
    //     <View style={styles.eventCard}>
    //         <Text style={styles.eventTitle}>{item.title}</Text>
    //         <Text style={styles.eventDate}>
    //             {new Date(item.start_time).toLocaleDateString()} -{" "}
    //             {new Date(item.end_time).toLocaleDateString()}
    //         </Text>
    //         <RenderHTML
    //             contentWidth={300} // Width của nội dung HTML
    //             source={{ html: item.content }}
    //         />
    //     </View>
    // );

    // if (isLoading) {
    //     return (
    //         <View style={styles.loadingContainer}>
    //             <ActivityIndicator size="large" color="#007BFF" />
    //         </View>
    //     );
    // }

    return (
        <View style={styles.container}>
            {/* <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderEventItem}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No events available</Text>
                }
            /> */}
        </View>
    );
};

export default Event;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    listContainer: {
        padding: 10,
    },
    eventCard: {
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    eventDate: {
        fontSize: 14,
        color: "#666",
        marginBottom: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        textAlign: "center",
        color: "#888",
        marginTop: 20,
    },
});
