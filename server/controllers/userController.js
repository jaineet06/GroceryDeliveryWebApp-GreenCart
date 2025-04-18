import User from "../models/user.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password){
            return res.json({success: false, message:"All fileds required"})
        }

        const isExist = await User.findOne({email});

        if(isExist){
            return res.json({success: false, message: "User Already Exists"})
        }

        const user = await User.create({name, email, password})
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d'
        })

        res.cookie('token', token, {
            httpOnly: true, // prevent js to access cookie
            secure: false,
            sameSite: 'strict', //CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        
        return res.json({success: true, message: "Account Created", user: {email: user.email, name: user.name}})
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message})
    }
}


const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        if(!email || !password){
            return res.json({success: false, message: "Enter all inputs"})
        }

        const isExist = await User.findOne({email})

        if(!isExist){
            return res.json({success: false, message: "No account found"})
        }

        const isPassword = await bcrypt.compare(password, isExist.password)

        if(!isPassword){
            return res.json({success: false, message: "Invalid credentials"})
        }

        const token = jwt.sign({id: isExist._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d'
        })

        res.cookie('token', token, {
            httpOnly: true, // prevent js to access cookie
            secure: false,
            sameSite: 'strict', //CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        
        return res.json({success: true, message: "Logged in succesfully!", user: {email: isExist.email, name: isExist.name}})

    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message})
    }
}


const isAuth = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await User.findById(userId).select("-password")

        return res.json({success: true, user})
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message})
    }
} 

const logoutUser = async (req, res) => {

    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        })

        return res.json({success: true, message: "Logged Out Succesfully"})
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message})
    }
}

export {registerUser, loginUser, isAuth, logoutUser}