import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Register Controller
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login Controller
export const login = async (req, res) => {
  const { email, password, role } = req.body;
  console.log('🔐 Login Data:', { email, password, role });

  try {
    // Static doctor check
    if (
      role === 'doctor' &&
      email === process.env.DOCTOR_EMAIL &&
      password === process.env.DOCTOR_PASSWORD
    ) {
      console.log("✔️ Doctor login successful");
      const token = jwt.sign(
        { id: 'doctor-static-id', email, role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      return res.json({ token, role, name: 'Dr. Admin' });
    }

    // Database user check
    const user = await User.findOne({ email });
    if (!user || user.role !== role) {
      return res.status(400).json({ message: "Invalid credentials or role mismatch" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Me Controller (get current user)
export const me = async (req, res) => {
  try {
    if (req.user.role === 'doctor') {
      return res.json({
        id: 'doctor-static-id',
        email: process.env.DOCTOR_EMAIL,
        role: 'doctor',
        name: 'Dr. Admin'
      });
    }

    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// ✅ Logout Controller (client-side only)
export const logout = (req, res) => {
  res.json({ message: "Logged out successfully (client-side only)" });
};






