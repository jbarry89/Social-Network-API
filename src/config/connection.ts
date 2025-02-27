import mongoose from 'mongoose';

// function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Uses environmental variable or default MongoDB URI
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetwork');
        console.log('MongoDB is Connected!');
    } catch (error) {
        console.error('MongoDB connection Failed.', error);
        process.exit(1);  // Exit the process when connection failed.
    }

};

export default connectDB;
