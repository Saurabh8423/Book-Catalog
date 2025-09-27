const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(" ")[1];
    try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
    } catch (error) {
        res.status(403).json({ success: false, message: 'Invalid token' });
    }
}

module.exports = authMiddleware;
