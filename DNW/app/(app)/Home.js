import { useRouter } from "expo-router";
import { Alert, Text, View, Button } from "react-native";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import LinearGradient from "react-native-linear-gradient";
import { Picker } from "@react-native-picker/picker";
function Home() {
    const { user } = useAuth();
    const [orderStatistics, setOrderStatistics] = useState({});
    const [dataChart, setDataChart] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(
        new Date().getMonth() + 1
    );
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const fetchOrderStatisticsChart = async () => {
        const url = `https://dnwmediavietnam.com/api/v1/orders/monthly-statistical?month=${selectedMonth}&year=${selectedYear}`;
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.access_token,
            },
        })
            .then((response) => response.json())
            .then((result) => setDataChart(result.data))
            .catch((err) => Alert.alert("Warning", "Lỗi,  " + err.toString()));
    };

    useEffect(() => {
        const fetchOrderStatistics = async () => {
            await fetch(
                "https://dnwmediavietnam.com/api/v1/orders/statistical",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + user.access_token,
                    },
                }
            )
                .then((response) => response.json())
                .then((result) => setOrderStatistics(result.data))
                .catch((err) =>
                    Alert.alert("Warning", "Lỗi,  " + err.toString())
                );
        };

        fetchOrderStatistics();
    }, []);

    useEffect(() => {
        fetchOrderStatisticsChart();
    }, [selectedMonth, selectedYear]);
    return (
        <View className="flex-1  h-[100%]  gap-4 py-4 bg-neutral-300">
            <View className="flex justify-around flex-row flex-wrap  ">
                <View className="flex gap-2 border-2 px-2 rounded border-orange-500 w-1/4 bg-white">
                    <Text className="text-black font-bold text-sm">Tổng</Text>
                    <Text className="font-bold text-orange-600">
                        {orderStatistics?.total?.total_orders} đơn
                    </Text>
                </View>
                <View className="flex gap-2 border-2 px-2 rounded border-orange-500 w-1/4 bg-white">
                    <Text className="text-black font-bold text-sm">
                        Hôm nay
                    </Text>
                    <Text className="font-bold text-orange-600">
                        {orderStatistics?.day?.total_orders} đơn
                    </Text>
                </View>
                <View className="flex gap-2 border-2 px-2 rounded border-yellow-500 w-1/4 bg-white">
                    <Text className="text-black font-bold first-letter:text-sm">
                        Hôm qua
                    </Text>
                    <Text className="font-bold text-yellow-600">
                        {orderStatistics?.yesterday?.total_orders} đơn
                    </Text>
                </View>
            </View>
            <View className="flex justify-around flex-row flex-wrap gap-1 ">
                <View className="flex gap-2 border-2 px-2 rounded border-blue-500 w-1/4 bg-white">
                    <Text className="text-gray-700 text-sm">Tuần</Text>
                    <Text className="font-bold text-blue-600">
                        {orderStatistics?.week?.total_orders} đơn
                    </Text>
                </View>
                <View className="flex gap-2 border-2 px-2 rounded border-blue-500 w-1/4 bg-white">
                    <Text className="text-gray-700 text-sm">Tháng</Text>
                    <Text className="font-bold text-blue-600">
                        {orderStatistics?.month?.total_orders} đơn
                    </Text>
                </View>
                <View className="flex gap-2 border-2 px-1 rounded border-blue-500 w-1/4 bg-white">
                    <Text className="text-gray-700 text-sm  ">Tháng trước</Text>
                    <Text className="font-bold text-blue-600">
                        {orderStatistics?.last_month?.total_orders} đơn
                    </Text>
                </View>
            </View>
            <View className="bg-white rounded h-full ">
                <View className="my-2 flex flex-row items-center">
                    <Text className="font-bold ml-2 text-blue-600">
                        Thống kê
                    </Text>
                    <View className="items-center my-2 flex flex-row text-sm">
                        <Picker
                            selectedValue={selectedMonth}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue) =>
                                setSelectedMonth(itemValue)
                            }
                        >
                            {[...Array(12).keys()].map((month) => (
                                <Picker.Item
                                    key={month + 1}
                                    label={`Tháng ${month + 1}`}
                                    value={month + 1}
                                    style={{ fontSize: 12 }}
                                />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={selectedYear}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue) =>
                                setSelectedYear(itemValue)
                            }
                        >
                            {[2023, 2024, 2025].map((year) => (
                                <Picker.Item
                                    key={year}
                                    label={`Năm ${year}`}
                                    value={year}
                                    style={{ fontSize: 12 }}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>
                <View>
                    <BarChart
                        barWidth={8}
                        noOfSections={5}
                        barBorderRadius={4}
                        frontColor="lightgray"
                        data={dataChart.map((el) => ({
                            value: el.total_orders,
                            label: el.date,
                            frontColor: "green",
                        }))}
                        yAxisThickness={0}
                        xAxisThickness={0}
                    />
                </View>
            </View>
        </View>
    );
}

export default Home;
