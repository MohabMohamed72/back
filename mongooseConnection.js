import mongoose from 'mongoose';
import Password from "./mongoPassword.js";

const StartServer = async () => {
    try {
        console.log('🔄 Connecting to MongoDB...');
        
        const connectionString = `mongodb+srv://bhoba17:${Password}@cluster0.6ioz53q.mongodb.net/authdb?retryWrites=true&w=majority&appName=Cluster`;
        
        await mongoose.connect(connectionString);
        
        console.log("✅ MongoDB connected successfully");
        
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        // Don't exit the process, just log the error
        console.log('Server will continue without database...');
    }
};

export default StartServer;