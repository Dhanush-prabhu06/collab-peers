import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userschema.js";
const registerUser = async (req, res) => {
  try {
    const { username, email, password, cpassword, collegename, year, course } =
      req.body;

    console.log(req.body);

    if (
      !username ||
      !email ||
      !password ||
      !cpassword ||
      !collegename ||
      !year ||
      !course
    ) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    if (password !== cpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = await User.create({
      username,
      email,
      password,
      collegename,
      year,
      course,
    });

    res.status(201).json({ msg: "Register successfull", newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Fill credentials" });
    }
    const user = await User.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!user) {
      res.status(400).json({ error: "invalid credentials" });
    } else if (!isMatch) res.status(400).json({ error: "invalid credentials" });
    else {
      const token = jwt.sign(
        {
          id: user._id,
          collegename: user.collegename,
          year: user.year,
          email: user.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );

      res.status(201).json({ message: "Login Successfull", token, user });
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchoneUser = async (req, res) => {
  try {
    const Token = req.headers.authorization?.split(" ")[1];
    if (!Token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(Token, process.env.SECRET_KEY);
    console.log(decoded);

    const data = await User.findOne({ email: decoded.email });

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ msg: "Internal servor error" + err });
  }
};

export const updateUser = async (req, res) => {
  const { email, username, collegename, year, course, password } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required to update the user." });
  }

  try {
    // Hash the password if it's provided
    const updateData = { username, collegename, year, course };
    if (password) {
      const salt = await bcrypt.genSalt(12);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findOneAndUpdate({ email }, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ msg: "Update successful", updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { authUser, registerUser };
