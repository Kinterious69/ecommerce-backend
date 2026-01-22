const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader) {
      return res.status(401).json({ success: false, errors: "No token, authorization denied" });
    }
    
    const token = authHeader.split(" ")[1]?.trim();
    if (!token) {
      return res.status(401).json({ success: false, errors: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;

    next();
  } catch (err) {
    console.error("JWT verification error:", err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, errors: "Token expired" });
    }

    return res.status(401).json({ success: false, errors: "Token is not valid" });
  }
};
