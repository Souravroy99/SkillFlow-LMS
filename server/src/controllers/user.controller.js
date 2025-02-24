import { User } from "../models/user.model.js";

export const register = async(req, res) => {
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        await User.create({
            name, email, password
        })

        return res.status(201).json({
            status: true,
            message: "User registered successfully."
        })
    }
    catch (err) {
        console.log(`user.controller.js --> register --> controller --> catch: ${err}`);
        return res.status(500).json({
            success: false,
            message: "Registration server error"
        })
    }
} 

export const login = async(req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exists!"
            })
        }

        const isPasswordMatch = await user.isPasswordCorrect(password)

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid user credentials!"
            })
        }

        const JWTtoken = await user.generateJWTtoken()
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24*60*60*1000
        }

        return res.status(200).cookie("token", JWTtoken, options).json({
            success: true,
            message: `Welcome back ${user.name}`,
            user
        })
    }
    catch (err) {
        console.log(`user.controller.js --> Login --> controller --> catch: ${err}`);
        return res.status(500).json({
            success: false,
            message: "Login server error"
        })
    }
}