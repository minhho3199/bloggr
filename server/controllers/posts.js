import BlogPosts from "../models/blogPosts.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await BlogPosts.find();
        console.log(posts);
        res.status(200).json(posts);
    } catch(err) {
        res.status(404).json(
            {
                message: err.message
            });
    }
};

export const addPost = async (req, res) => {
    const post = req.body;
    
    const newPost = new BlogPosts(post);
    try {
        await newPost.save();
        res.json(post);
    } catch(err) {
        res.json({message: err.message});
    }
}