const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Get token from Authorization header (case-insensitive)
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader) {
      return res.status(401).json({ success: false, errors: "No token, authorization denied" });
    }

    // Extract token: "Bearer <token>"
    const token = authHeader.split(" ")[1]?.trim();
    if (!token) {
      return res.status(401).json({ success: false, errors: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded.user;

    // Proceed to next middleware
    next();
  } catch (err) {
    console.error("JWT verification error:", err);

    // Handle expired token separately
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, errors: "Token expired" });
    }

    // Handle invalid token
    return res.status(401).json({ success: false, errors: "Token is not valid" });
  }
};
