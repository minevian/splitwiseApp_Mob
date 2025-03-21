import axios from "axios";

const apiMultimediaClient = axios.create({
    baseURL:'http://localhost:8080/api/',
    // baseURL:'https://splitwiseapp-api.onrender.com/api',
    headers:{
       'Content-Type': 'multipart/form-data' 
    }
})

export default apiMultimediaClient