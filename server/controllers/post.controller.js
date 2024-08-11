import Notification from "../models/notification.model.js"
import Post from "../models/post.model.js"
import User from "../models/user.model.js"
import { v2 as cloudinary } from "cloudinary"

export const createPost = async (req, res) => {
    try {
        const { text } = req.body
        let { img } = req.body
        const userId = req.user._id.toString()

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!text && !img) {
            return res.status(400).json({ error: 'Please provide text or an image' });
        }

        if (img) {
            const uploadImg = await cloudinary.uploader.upload(img)
            img = uploadImg.secure_url
        }

        const newPost = new Post({
            user: userId,
            text: text,
            img: img,
        })

        await newPost.save()
        res.status(201).json(newPost);
    } catch (err) {
        return res.status(500).json(err.message)
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You are not authorized to delete this post' });
        }
        if (post.img) {
            await cloudinary.uploader.destroy(post.img.split("/").pop().split(".")[0])
        }

        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

export const commentPost = async (req, res) => {
    try {
        const { text } = req.body
        const postId = req.params.id
        const userId = req.user._id

        if (!text) {
            return res.status(400).json({ error: 'Please provide a comment text' });
        }
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const comment = { user: userId, text }

        post.comments.push(comment)

        await post.save()
        res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

export const likeUnlikePost = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.user._id

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        const userLikedPost = post.likes.includes(userId)
        if (userLikedPost) {
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } })
            await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } })
            res.status(200).json({ message: 'Post disliked successfully' })
        } else {
            post.likes.push(userId)
            await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } })
            await post.save()
            const newNotification = new Notification({
                from: userId,
                to: post.user,
                type: "like",
            })

            await newNotification.save()
            res.status(200).json({ message: 'Post liked successfully' })
        }
    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const allPost = async (req, res) => {
    try {
        const post = await Post.find().sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password"
        })
            .populate({
                path: "comments.user",
                select: "-password"
            })
        if (post.length === 0) {
            return res.status(404).json([]);
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getLikedPost = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const likedPost = await Post.find({ _id: { $in: user.likedPosts } }).populate({
            path: "user",
            select: "-password"
        }).populate({
            path: "comments.user",
            select: "-password"
        })
        res.status(200).json(likedPost)
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getFollowingPost = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const following = user.following
        const followPost = await Post.find({ user: { $in: following } }).sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password"
        }).populate({
            path: "comments.user",
            select: "-password"
        })
        res.status(200).json(followPost)
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getUserPost = async (req, res) => {
    try {
        const username = req.params.username
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const post = await Post.find({ user: user._id })
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password"
            })
            .populate({
                path: "comments.user",
                select: "-password"
            })
        res.status(200).json(post)
    } catch (err) {
        return res.status(500).json(err.message)
    }
}