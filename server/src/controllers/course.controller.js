import { Course } from "../models/course.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

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
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch course"
        })
    }
}

export const editCourse = async(req, res) => {
    try {
        const courseId = req.params.courseId
        const {courseTitle, subTitle, description, category, courseLevel, coursePrice} = req.body     
        const thumbnail = req.file

        let course = await Course.findById(courseId)
        if(!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found!"
            })
        }   

        let courseThumbnail = "" ;
        if(thumbnail) {
            if(course.courseThumbnail) {
                const publicId = course.courseThumbnail.split("/").pop().split('.')[0]

                await deleteMediaFromCloudinary(publicId) ; // Delete old image from cloudinary
            }
            
            courseThumbnail = uploadMedia(thumbnail.path)
        }


        const updateDatas = {courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail: courseThumbnail?.secure_url}

        course = await Course.findByIdAndUpdate(courseId, updateDatas, {new: true})

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to edit course"
        })
    }
}


export const getCourseById = async(req, res) => {
    try {
        const courseId = req.params.courseId 
        const course = await Course.findById(courseId);
        
        if(!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found!!"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Course found successfully",
            course
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch course data"
        })
    }
}