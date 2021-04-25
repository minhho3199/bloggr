import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import users from "./routes/users.js";
import posts from "./routes/posts.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const CONNECTION_URL = "mongodb+srv://minhho3199:kevinlevin11@cluster0.aug2o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((err) => console.log(err));
mongoose.set('useFindAndModify', false);

app.use("/users", users);
app.use("/posts", posts);