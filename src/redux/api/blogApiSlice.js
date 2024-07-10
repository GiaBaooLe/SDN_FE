import { BLOG_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBlogs: builder.query({
      query: () => `${BLOG_URL}`,
      providesTags: ['Blog'],
    }),
    fetchBlogById: builder.query({
      query: (blogId) => `${BLOG_URL}/${blogId}`,
      providesTags: ['Blog'],
    }),
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: `${BLOG_URL}`,
        method: 'POST',
        body: newBlog,
      }),
      invalidatesTags: ['Blog'],
    }),
    updateBlog: builder.mutation({
      query: ({ blogId, updatedBlog }) => ({
        url: `${BLOG_URL}/${blogId}`,
        method: 'PUT',
        body: updatedBlog,
      }),
      invalidatesTags: ['Blog'],
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `${BLOG_URL}/${blogId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const {
  useFetchBlogsQuery,
  useFetchBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApiSlice;
