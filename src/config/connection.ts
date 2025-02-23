import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/socialnetwork', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB is Connected');
    } catch (error) {
        console.error('MongoDB connection Failed.', error);
        process.exit(1);  // Exit the process when connection failed/.
    }

};


export default connectDB;
