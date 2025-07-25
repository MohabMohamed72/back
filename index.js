import express from 'express'
import AuthRegister from "./auth/controller/auth_controller.js";
import StartServer from './mongooseConnection.js'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: 'https://back-production-a5a6.up.railway.app', // Allow only this domain
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
        credentials: true, // Enable if using cookies/auth
    }
))
StartServer.apply(this);
AuthRegister(app);


app.listen(3000);
