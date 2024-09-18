import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" })
        }

        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists" })
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" })
        }

        const hashPassword = bcrypt.hashSync(password, 12)
        const newUser = new User({ fullName, username, email, password: hashPassword })
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                fullName: newUser.fullName,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg
            })
        } else {
            return res.status(400).json({ error: "Failed to create user" })
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" })
        }
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid credentials" })
        }
        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg
        })
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}