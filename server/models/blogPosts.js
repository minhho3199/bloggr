import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: "users",
    //     required: true
    // },
    author: {
        type: String,
    },
    postType: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const BlogPosts = mongoose.model("posts", PostSchema);
export default BlogPosts;