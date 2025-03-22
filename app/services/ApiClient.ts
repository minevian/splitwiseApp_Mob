import axios from "axios";

const apiClient = axios.create({
    baseURL:'http://localhost:8080/api/',
    // baseURL:'https://splitwiseapp-api.onrender.com/api',
    headers:{
        "Content-Type":"application/json"
    }
})

export default apiClient