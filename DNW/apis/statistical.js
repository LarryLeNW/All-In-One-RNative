import axios from "../config/axios.config";

export const getOrderStatistics = () =>
    axios({
        url: "/orders/statistical",
        method: "get",
    });
