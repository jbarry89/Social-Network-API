import { Request, Response } from "express";
import User from "../models/User";
import { Types } from "mongoose";

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { username, email } = req.body;

  // Check if there is a username or email
  if (!username || !email) {
    return res.status(400).json({ message: "Username and email are required" });
  }

  // Check if the username or email already exists
  const userExist = await User.findOne({ $or: [{ username }, { email }] });
  if (userExist) {
    return res
      .status(400)
      .json({ message: "Username or email already exists" });
  }

  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Update user by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// Add a friend to the user's friend list
export const addFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;

  try {
    // Convert the string IDs to ObjectId
    const userObjectId = new Types.ObjectId(userId);
    const friendObjectId = new Types.ObjectId(friendId);

    const user = await User.findById(userObjectId);
    const friend = await User.findById(friendObjectId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or Friend not found" });
    }

    // Add friend to the user's friend list
    if (!user.friends.includes(friendObjectId)) {
      user.friends.push(friendObjectId);
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "Already friends" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to add friend", error });
  }
};

// Remove a friend from the user's friend list
export const removeFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;

  try {
    // Convert string IDs to ObjectId
    const userObjectId = new Types.ObjectId(userId);
    const friendObjectId = new Types.ObjectId(friendId);

    const user = await User.findById(userObjectId);
    if (!user || !user.friends.includes(friendObjectId)) {
      return res.status(404).json({ message: "Friend not found" });
    }

    // Remove friend from the user's friend list
    user.friends = user.friends.filter(
      (friend) => friend.toString() !== friendObjectId.toString()
    );
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove friend", error });
  }
};
