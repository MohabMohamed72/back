import express from 'express'
import AuthRegister from "./auth/controller/auth_controller.js";
import StartServer from './mongooseConnection.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

StartServer.apply(this);
// AuthRegister(app);

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


app.listen(3000);
