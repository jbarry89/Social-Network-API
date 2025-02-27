import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";
import Thought from "../models/Thought";
import Reaction from "../models/Reaction";

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Database is connected!");

    // Clearing the existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    await Reaction.deleteMany({});
    console.log("Old data cleared!");

    // Seed the Users
    const users = await User.insertMany([
      { username: "john_doe", email: "john@example.com" },
      { username: "jane_smith", email: "jane@example.com" },
      { username: "mike_jones", email: "mike@example.com" },
    ]);

    console.log("Users have been seeded:", users);

    // Seed the thoughts with the associated user
    const thoughts = await Thought.insertMany([
      { thoughtText: "This is my first thought!", userId: users[0]._id },
      { thoughtText: "Learning MongoDB is fun!", userId: users[1]._id },
      { thoughtText: "I love backend development!", userId: users[2]._id },
    ]);

    console.log("Thoughts have been seeded:", thoughts);

    // Seed The Reactions (Associate with thoughts and users)
    const reactions = await Reaction.insertMany([
      {
        thoughtId: thoughts[0]._id,
        userId: users[1]._id,
        reactionType: "like",
      },
      {
        thoughtId: thoughts[1]._id,
        userId: users[2]._id,
        reactionType: "love",
      },
      { thoughtId: thoughts[2]._id, 
        userId: users[0]._id, 
        reactionType: "wow" },
    ]);

    console.log("Reaction have been seeded:", reactions);

    mongoose.connection.close();
    console.log("Database seeding complete!");

  } catch (err) {
    console.error("Error seeding the Database:", err);
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();
