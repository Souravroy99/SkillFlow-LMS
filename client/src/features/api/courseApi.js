import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:3001/api/v1/course/"

export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ['Refetch_Creator_Course'],
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({ 
        createCourse: builder.mutation({
            query: ({courseTitle, category, coursePrice}) => ({
                url: "",
                method: "POST",
                body: { courseTitle, category, coursePrice }
            }),
            invalidatesTags: ['Refetch_Creator_Course'],
        }),
        getCreatorCourse: builder.query({
            query: () => ({
                url: "",
                method: "GET",
            }),
            invalidatesTags: ['Refetch_Creator_Course']
        }),
    })
})

export const { useCreateCourseMutation, useGetCreatorCourseQuery } = courseApi