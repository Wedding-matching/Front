import axois from "axois";

export const API = axois.create({
    baseURL: process.env.REACT_APP_API_URL, //.env값 적용(CRA방식)
    hearders: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})