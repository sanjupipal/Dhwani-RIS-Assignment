const jwt = require("jsonwebtoken");
const User = require("../model/User");
exports.authMiddleware = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(400).json({ error: "Authentication Error" });
  }

  try {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    user = await User.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(400).json({
        error: "Not Authorized",
      });
    }
    global.userId = decoded._id;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
};
