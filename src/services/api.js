import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PUBLIC_ENDPOINTS = [
    "login",
    "register",
    "refreshToken",
];


const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    prepareHeaders: (headers, { endpoint }) => {
        headers.set("Content-Type", "application/json");

        if (!PUBLIC_ENDPOINTS.includes(endpoint)) {
            const token = localStorage.getItem("accessToken");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
        }

        return headers;
    },
});

export const api = createApi({
    reducerPath: "api",
    baseQuery,

    tagTypes: [
        "Auth",
        "Users",
        "Calls",
        "Reports",
    ],

    endpoints: () => ({}),
});