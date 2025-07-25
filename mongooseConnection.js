import mongoose from 'mongoose';
import Password from "./mongoPassword.js";

const StartServer = ()=>{
    mongoose
      .connect(
`mongodb+srv://bhoba17:${Password}@cluster0.6ioz53q.mongodb.net/AuthApi?retryWrites=true&w=majority&appName=Cluster`
        // `mongodb+srv://bhoba17:${Password}@cluster0.6ioz53q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`
      )
      .then(() => {
        console.log("success");
        
      })
      .catch((err) => {
        console.log(err);
      });
}

export default StartServer
