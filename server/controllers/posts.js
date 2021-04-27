import BlogPosts from "../models/blogPosts.js";

export const getPosts = async (req, res) => {
	try {
		const posts = await BlogPosts.find().populate('author', 'name');
		const filteredPosts = posts.filter((post) => {
			return post.postType === 1 || (post.postType === 2 && post.author._id.toString() === req.params.userId);
		});
		console.log(filteredPosts);
		res.status(200).json(filteredPosts);

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
		console.log(updatedPost);
		return res.json(200).json(updatedPost);
	} catch (err) {
		return res.status(500).json({ message: "Something went wrong" });
	}
}