import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ message: "No token, authorization required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({
      message: "Token is not valid"
    });
  }
}

export default auth;