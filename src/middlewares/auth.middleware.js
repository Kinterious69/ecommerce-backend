/*const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, errors: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ success: false, errors: "Token is not valid" });
  }
};
*/
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ success: false, errors: "No token, authorization denied" });
  }

  // Extract token: "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, errors: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // attach user info to req
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ success: false, errors: "Token is not valid" });
  }
};
