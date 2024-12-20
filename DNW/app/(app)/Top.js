import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useAuth } from "../../context/authContext";
import { capitalizeWords } from "../../utils/common";

const SkeletonLoader = () => {
    const skeletonItems = Array(7).fill(null);
    return (
        <View>
            {skeletonItems.map((_, index) => (
                <View key={index} style={styles.skeletonContainer}>
                    <View style={styles.skeletonAvatar} />
                    <View style={styles.skeletonTextContainer}>
                        <View style={styles.skeletonText} />
                        <View style={styles.skeletonSubText} />
                        <View style={styles.skeletonSubText} />
                    </View>
                </View>
            ))}
        </View>
    );
};

const Top = () => {
    const [topData, setTopData] = useState([]);
    const [timeframe, setTimeframe] = useState("day");
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrderTop = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `https://dnwmediavietnam.com/api/v1/users/statistical/orders?timeframe=${timeframe}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + user.access_token,
                        },
                    }
                );
                const result = await response.json();
                setTopData(result.data || []);
            } catch (err) {
                Alert.alert("Warning", "Lỗi, " + err.toString());
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderTop();
    }, [timeframe]);

    const getTextColor = (index) => {
        switch (index) {
            case 0:
                return "#A51496";
            case 1:
                return "#060270";
            case 2:
                return "#E48811";
            case 3:
                return "#0CC550";
            case 4:
                return "#8E6557";
            default:
                return "#000";
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <Text style={[styles.rank, { color: getTextColor(index) }]}>
                #{index + 1}
            </Text>
            <Image
                source={{ uri: item.avatar }}
                style={styles.avatar}
                resizeMode="cover"
            />
            <View style={styles.info}>
                <Text style={[styles.name, { color: getTextColor(index) }]}>
                    {item.name}
                </Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={[styles.orders, { color: getTextColor(index) }]}>
                    {item.orders_count} đơn
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                {["day", "yesterday", "week", "month", "year"].map((filter) => (
                    <TouchableOpacity
                        key={filter}
                        style={[
                            styles.filterButton,
                            timeframe === filter && styles.activeFilter,
                        ]}
                        onPress={() => setTimeframe(filter)}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                timeframe === filter && styles.activeText,
                            ]}
                        >
                            {capitalizeWords(filter)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {isLoading ? (
                <SkeletonLoader />
            ) : (
                <FlatList
                    data={topData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No data available</Text>
                    }
                />
            )}
        </View>
    );
};

export default Top;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        padding: 10,
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
    },
    filterButton: {
        padding: 10,
        backgroundColor: "#ddd",
        borderRadius: 5,
    },
    activeFilter: {
        backgroundColor: "#6200ea",
    },
    filterText: {
        color: "#000",
    },
    activeText: {
        color: "#fff",
        fontWeight: "bold",
    },
    listContainer: {
        paddingBottom: 10,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 1,
    },
    rank: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    email: {
        fontSize: 14,
        color: "#555",
    },
    orders: {
        fontSize: 14,
        color: "#888",
    },
    emptyText: {
        textAlign: "center",
        color: "#888",
        marginTop: 20,
    },
    skeletonContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#e0e0e0",
    },
    skeletonAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#d4d4d4",
        marginRight: 10,
    },
    skeletonTextContainer: {
        flex: 1,
    },
    skeletonText: {
        height: 15,
        backgroundColor: "#d4d4d4",
        borderRadius: 4,
        marginBottom: 5,
    },
    skeletonSubText: {
        height: 10,
        backgroundColor: "#d4d4d4",
        borderRadius: 4,
        marginBottom: 5,
        width: "80%",
    },
});
