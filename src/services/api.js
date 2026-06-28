import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PUBLIC_ENDPOINTS = ["login", "register", "refreshToken"];

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}`,

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

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const endpoint = api.endpoint;

  const isPublicEndpoint = PUBLIC_ENDPOINTS.includes(endpoint);

  if (!isPublicEndpoint) {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      window.location.href = "/login";
      return {
        error: {
          status: 401,
          data: "No access token",
        },
      };
    }
  }

  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401 && !isPublicEndpoint) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";

      return result;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/token/refresh/",
        method: "POST",
        body: {
          refresh: refreshToken,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data?.access) {
      localStorage.setItem("accessToken", refreshResult.data.access);

      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      window.location.href = "/login";
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,

  tagTypes: ["Auth", "Users", "Calls", "Reports"],

  endpoints: () => ({}),
});