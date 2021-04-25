import express from "express";
import {getPosts, addPost} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getPosts);
router.post("/add", auth, addPost);
export default router;