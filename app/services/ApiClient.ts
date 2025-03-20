import axios from "axios";

const apiClient = axios.create({
    baseURL:'https://splitwiseapp-api.onrender.com/api',
    headers:{
        "Content-Type":"application/json"
    }
})

export default apiClient