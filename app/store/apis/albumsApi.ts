import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

// DEV ONLY !!
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      //REMOVE FOR PROUCTION
      await pause(1000);
      return fetch(...args);
    },
  }),
  tagTypes: ["Album", "UsersAlbums"],
  endpoints: (builder) => ({
    fetchAlbums: builder.query({
      providesTags: (result, error, user) => {
        const tags = result.map((album: any) => {
          return { type: "Album", id: album.id };
        });
        tags.push({ type: "UsersAlbums", id: user.id });
        return tags;
      },
      query: (user) => {
        return {
          url: `/albums`,
          params: {
            userId: user.id,
          },
          method: "GET",
        };
      },
    }),
    createAlbum: builder.mutation({
      invalidatesTags: (result, error, user) => {
        return [{ type: "UsersAlbums", id: user.id }];
      },
      query: (user) => {
        return {
          url: `/albums`,
          method: "POST",
          body: {
            userId: user.id,
            title: faker.commerce.productName(),
          },
        };
      },
    }),
    removeAlbum: builder.mutation({
      invalidatesTags: (result, error, album) => {
        return [{ type: "Album", id: album.id }];
      },
      query: (album) => {
        return {
          url: `/albums/${album.id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useFetchAlbumsQuery,
  useCreateAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
