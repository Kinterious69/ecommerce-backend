const Users = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    let user = await Users.findOne({ email });
    if (user)
      return res.status(400).json({ success: false, errors: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with empty cart
    user = await Users.create({
      name: username,
      email,
      password: hashedPassword,
      cart: [],
    });

    // Sign JWT token
    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, errors: "Server error" });
  }
};

// LOGIN 
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ success: false, errors: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, errors: "Invalid password" });

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, errors: "Server error" });
  }
};

