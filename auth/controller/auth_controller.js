import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AuthSchema = new Schema({
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
}, {
    timestamps: true // This will add createdAt and updatedAt fields
});

const AuthModel = mongoose.models.User || mongoose.model('User', AuthSchema);

const AuthRegister = (app) => {
    // Register route with proper error handling
    app.post('/register', async (req, res) => {
        try {
            // Validate required fields
            const { name, email, password } = req.body;
            
            if (!name || !email || !password) {
                return res.status(400).json({
                    status: false,
                    message: "All fields (name, email, password) are required",
                    data: null
                });
            }

            // Check if user already exists
            const existingUser = await AuthModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    status: false,
                    message: "User with this email already exists",
                    data: null
                });
            }

            // Create new user
            const AuthData = new AuthModel({
                name,
                email,
                password
            });

            // Save to database
            const savedUser = await AuthData.save();
            
            const DataStatus = {
                status: true,
                message: "User registered successfully",
                data: {
                    id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email
                    // Don't return password in response
                }
            };
            
            res.status(201).json(DataStatus);
            
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error.message
            });
        }
    });

    // Get users route (fixed model reference)
    app.get('/get_users', async (req, res) => {
        try {
            const Data = await AuthModel.find().select('-password'); // Exclude password from response
            const DataStatus = {
                status: true,
                message: "Users fetched successfully",
                data: Data
            };
            res.json(DataStatus);
        } catch (error) {
            console.error('Fetch users error:', error);
            res.status(500).json({
                status: false,
                message: "Error fetching users",
                error: error.message
            });
        }
    });
}

export default AuthRegister;