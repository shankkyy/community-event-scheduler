const bcrypt = require('bcrypt');
const userModel = require('./userModel');
const createHttpError = require('http-errors');
const { sign, verify } = require('jsonwebtoken');
require('dotenv').config();

// In-memory token blacklist
const blacklistedTokens = new Set();

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists!!" });
    }

    const hashedPassword = await bcrypt.hash(password, 9);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = sign({ id: newUser._id }, process.env.SECRET, { expiresIn: '5000s' });

    res.status(201).json({ message: "User created successfully", user: newUser, accessToken: token });
  } catch (err) {
    next(createHttpError(500, "Error while creating user."));
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong credentials" });
    }

    const token = sign({ id: user._id }, process.env.SECRET, { expiresIn: "7d" });

    res.status(200).json({ accessToken: token });
  } catch (err) {
    next(createHttpError(500, "Error while logging in."));
  }
};

const logoutUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(' ')[1];

  // Add token to blacklist
  blacklistedTokens.add(token);

  res.status(200).json({ message: "Logged out successfully" });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(' ')[1];

  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ message: "Token has been invalidated" });
  }

  try {
    const decoded = verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { createUser, loginUser, logoutUser, verifyToken };
