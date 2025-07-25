import Auth from '../model/auth_model.js';

const AuthRegister = (app) => {
    // Register endpoint
    app.post('/register', async (req, res) => {
        try {
            const { name, email, password } = req.body;
            
            // Basic validation
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
                password // In production, hash this password!
            });

            const savedUser = await AuthData.save();
            
            res.status(201).json({
                status: true,
                message: "User registered successfully",
                data: {
                    id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email
                    // Don't send password back
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

    // Get all users endpoint
    app.get('/get_users', async (req, res) => {
        try {
            const users = await Auth.find({}, { password: 0 }); // Exclude passwords
            
            res.status(200).json({
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

    // Get single user by ID
    app.get('/user/:id', async (req, res) => {
        try {
            const user = await Auth.findById(req.params.id, { password: 0 });
            
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }

            res.status(200).json({
                status: true,
                message: "User fetched successfully",
                data: user
            });

        } catch (error) {
            console.error('Fetch user error:', error);
            res.status(500).json({
                status: false,
                message: "Failed to fetch user",
                error: error.message
            });
        }
    });
};

export default AuthRegister;