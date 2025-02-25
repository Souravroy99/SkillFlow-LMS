import { Course } from "../models/course.model.js";

export const createCourse = async(req, res) => {
    try {
        
        const {courseTitle, category, coursePrice} = req.body

        if(!courseTitle || !category || !coursePrice) {
            return res.status(400).json({
                success: false,
                message: "Course title, Course Price, and category are required."
            })
        }

        const course = await Course.create({
            courseTitle,
            category,
            coursePrice,
            creator: req.id,
        })

        return res.status(201).json({
            success: true,
            message: "Course created.",
            course
        })

    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create course"
        })
    }
}

export const getCreatorCourses = async(req, res) => {
    try {
        const id = req.id 
        const courses = await Course.find({creator: id})
        if(!courses) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Successfully fetch all courses",            
            courses
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch course"
        })
    }
}