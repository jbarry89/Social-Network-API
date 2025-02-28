import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";
import Thought from "../models/Thought";

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Database is connected!");

    // Clearing the existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

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
      {
        thoughtText: "This is my first thought!",
        username: users[0].username,
        reaction: [],
      },
      {
        thoughtText: "Learning MongoDB is fun!",
        username: users[1].username,
        reaction: [],
      },
      {
        thoughtText: "I love backend development!",
        username: users[2].username,
        reaction: [],
      },
    ]);

    console.log("Thoughts have been seeded:", thoughts);

    // Seed the Reactions associated with thoughts and users
    await Thought.updateOne(
      { _id: thoughts[0]._id },
      {
        $push: {
          reactions: { reactionBody: "like", username: users[1].username },
        },
      }
    );
    await Thought.updateOne(
      { _id: thoughts[1]._id },
      {
        $push: {
          reactions: { reactionBody: "love", username: users[2].username },
        },
      }
    );
    await Thought.updateOne(
      { _id: thoughts[2]._id },
      {
        $push: {
          reactions: { reactionBody: "wow", username: users[0].username },
        },
      }
    );

    mongoose.connection.close(); // Close the database connection when seeding is complete
    console.log("Database seeding complete!");
  } catch (err) {
    console.error("Error seeding the Database:", err);
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();
