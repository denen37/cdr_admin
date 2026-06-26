import { api } from "./api";

export const callApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getLatestCalls: builder.query({
            query: () => "/calls/latest/",
            providesTags: ["Calls"],
        }),

        getCalls: builder.query({
            query: (query) => `/calls/${query ? `?${query}` : ''}`,
            providesTags: ["Calls"],
        }),

        getStartTimes: builder.query({
            query: (query) => `/calls/get_start_times/${query ? `?${query}` : ''}`,
            providesTags: ["Calls"],
        }),

        getCall: builder.query({
            query: (id) => `/calls/${id}/`,
        }),

        createCall: builder.mutation({
            query: (body) => ({
                url: "/calls/",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Calls"],
        }),

        updateCall: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/calls/${id}/`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Calls"],
        }),

        deleteCall: builder.mutation({
            query: (id) => ({
                url: `/calls/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Calls"],
        }),
    }),
});

export const {
    useGetLatestCallsQuery,
    useGetCallsQuery,
    useGetCallQuery,
    useGetStartTimesQuery,
    useCreateCallMutation,
    useUpdateCallMutation,
    useDeleteCallMutation,
} = callApi;