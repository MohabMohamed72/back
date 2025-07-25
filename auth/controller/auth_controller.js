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
});

const AuthModel = mongoose.models.User || mongoose.model('User', AuthSchema);

const AuthRegister = (app) => {
    app.post('/register', async (req, res) => {
        try {
            const AuthData = new AuthModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            
            await AuthData.save();

            res.json({
                status: true,
                message: "Data Saved Successfully",
                data: AuthData
            });
        } catch (error) {
            console.error("Error saving user:", error);
            res.status(500).json({
                status: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    });

    // app.get('/get_users', async (req, res) => {
    //     try {
    //         const users = await AuthModel.find();
    //         res.json({
    //             status: true,
    //             message: "Fetched Successfully",
    //             data: users
    //         });
    //     } catch (error) {
    //         console.error("Error fetching users:", error);
    //         res.status(500).json({
    //             status: false,
    //             message: "Internal Server Error",
    //             error: error.message
    //         });
    //     }
    // });
};

export default AuthRegister;
