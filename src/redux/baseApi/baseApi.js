import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
    credentials: "include",
  }),
  // tagTypes
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
    }),

    checkEmail: builder.mutation({
      query: (email) => ({
        url: "email",
        method: "POST",
        body: email,
      }),
    }),

    checkPassword: builder.mutation({
      query: (data) => ({
        url: "password",
        method: "POST",
        body: data,
      }),
    }),

    getUserDetails: builder.query({
      query: () => "user-details",
    }),

    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),

    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: "update-details",
        method: "PUT",
        body: data,
      }),
    }),

    searchUser: builder.query({
      query: ({ search, limit, page }) =>
        `search-user?search=${search}&limit=${limit}&page=${page}`,
    }),
  }),
});

export const {
  useRegisterMutation,
  useCheckEmailMutation,
  useCheckPasswordMutation,
  useGetUserDetailsQuery,
  useLogoutMutation,
  useUpdateUserDetailsMutation,
  useSearchUserQuery
} = baseApi;
