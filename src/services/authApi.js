import { api } from "./api";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login/",
                method: "POST",
                body: credentials,
            }),
        }),

        register: builder.mutation({
            query: (user) => ({
                url: "/auth/register/",
                method: "POST",
                body: user,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
        }),

        getProfile: builder.query({
            query: () => "/auth/profile",
            providesTags: ["Auth"],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetProfileQuery,
} = authApi;