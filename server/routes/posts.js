import express from "express";
import { getPosts, createPost, deletePost, updatePost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/get/:userId', getPosts);
router.post("/create", auth, createPost);
router.delete("/delete/:postId", auth, deletePost);
router.post("/update/:postId", auth, updatePost);
export default router;