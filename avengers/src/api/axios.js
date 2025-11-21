import axios from "axios";

export const API = axios.create({
    baseURL: "http://3.26.24.241:8000", //.env값 적용(CRA방식)
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
})