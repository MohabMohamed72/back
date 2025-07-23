import express from 'express'
import AuthRegister from "./auth/controller/auth_controller.js";
import StartServer from './mongooseConnection.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

StartServer.apply(this);
AuthRegister(app);


app.listen(3000);
