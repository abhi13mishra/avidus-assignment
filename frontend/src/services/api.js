import axios from "axios";

const api = axios.create({
    baseURL: "https://avidus-assignment-1-fd6m.onrender.com/api"
});

export default api;