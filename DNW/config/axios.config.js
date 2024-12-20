import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
    baseURL: process.env.REACT_APP_URI_API,
    withCredentials: true,
});

instance.interceptors.request.use(
    async function (config) {
        const token = await JSON.parse(AsyncStorage.getItem("userInfo"))
            ?.access_token;
        console.log("🚀 ~ token:", token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        const message =
            error?.response?.data?.message || "Something went wrong";
        return Promise.reject(message);
    }
);

export default instance;
