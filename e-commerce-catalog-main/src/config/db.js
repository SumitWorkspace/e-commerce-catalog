import mongoose from 'mongoose';



const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb+srv://exp4Database:Anu@cluster0.ovoh8lc.mongodb.net/?appName=Cluster0';
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
