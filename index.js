import express from 'express';
import AuthRegister from "./auth/controller/auth_controller.js";
import StartServer from './mongooseConnection.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start MongoDB connection
const initializeApp = async () => {
    try {
        await StartServer();
        console.log('MongoDB connected successfully');
        
        // Register routes after DB connection
        AuthRegister(app);
        
        // Start server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        
    } catch (error) {
        console.error('Failed to initialize app:', error);
        process.exit(1);
    }
};

initializeApp();