import express from 'express';
import mongoose from 'mongoose';
import StartServer from './mongooseConnection.js';

const app = express();

// Add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Auth Schema directly here to avoid import issues
const AuthSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const Auth = mongoose.model('User', AuthSchema);

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Auth API is running!',
        status: 'success',
        endpoints: {
            register: 'POST /register',
            getUsers: 'GET /get_users'
        }
    });
});

// Register route
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "All fields (name, email, password) are required"
            });
        }

        // Check if user already exists
        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                status: false,
                message: "User with this email already exists"
            });
        }

        // Create new user
        const AuthData = new Auth({
            name,
            email,
            password
        });
        
        const savedUser = await AuthData.save();
        
        res.status(201).json({
            status: true,
            message: "User registered successfully",
            data: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            }
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            status: false,
            message: "Registration failed",
            error: error.message
        });
    }
});

// Get users route
app.get('/get_users', async (req, res) => {
    try {
        const users = await Auth.find({}, { password: 0 });
        
        res.json({
            status: true,
            message: "Users fetched successfully",
            count: users.length,
            data: users
        });
        
    } catch (error) {
        console.error('Fetch users error:', error);
        res.status(500).json({
            status: false,
            message: "Failed to fetch users",
            error: error.message
        });
    }
});

// Initialize database connection
StartServer();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});