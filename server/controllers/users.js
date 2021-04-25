import User from "../models/users.js";
import bcrypt from "bcryptjs"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });
    const hashedPass = await bcrypt.hash(password, 12);
    const newUser = await User.create({ name, email, password: hashedPass });
    await newUser.save();
    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1h"});
    res.status(200).send(token);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" }); 
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1h"});
    res.status(200).send(token);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
