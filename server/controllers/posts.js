import BlogPosts from "../models/blogPosts.js";
import mongoose from "mongoose";
export const getPosts = async (req, res) => {
	try {
		const count = Number(req.query.count);
		console.log(count);
		const userId = mongoose.Types.ObjectId(req.params.userId);
		const posts = await BlogPosts.find()
		.or([{ postType: 1 }, { postType: 2, "author": userId }])
		.skip(count).limit(5).populate('author', 'name');
		
		return res.status(200).json(posts);

	} catch (err) {
		return res.status(500).json(
			{
				message: "Something went wrong"
			});
	}
};

export const createPost = async (req, res) => {
	const { title, message, author, postType } = req.body;
	const newPost = new BlogPosts({ title, message, author, postType });
	try {
		await newPost.save();
		res.status(200).json(newPost);
	} catch (err) {
		res.status(500).json({ message: "Something went wrong" });
	}
}

export const deletePost = async (req, res) => {
	try {
		await BlogPosts.findByIdAndDelete({ _id: req.params.postId });
		res.status(200).json({ message: "Post deleted successfully" });
	} catch (err) {
		res.status(500).json({ message: "Something went wrong" });
	}
}


export const updatePost = async (req, res) => {
	const post = req.body;
	try {
		const updatedPost = await BlogPosts.findByIdAndUpdate({ _id: req.params.postId }, post, { new: true });
		res.status(200).json(updatedPost);
	} catch (err) {
		return res.status(500).json({ message: "Something went wrong" });
	}
}