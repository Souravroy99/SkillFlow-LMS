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
            query: ({ courseTitle, category, coursePrice }) => ({
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
        editCourse: builder.mutation({
            query: ({formData, courseId}) => ({
                url: `/${courseId}`,
                method: "PUT",
                body: formData
            })
        }),
        getCourseById: builder.query({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: "GET",
            })
        }),
    })
})


export const { useCreateCourseMutation, useGetCreatorCourseQuery, useEditCourseMutation, useGetCourseByIdQuery } = courseApi