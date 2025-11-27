import axios from "axios";

export const API = axios.create({
    baseURL: "", //.env값 적용(CRA방식)
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
})