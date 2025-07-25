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

// const AuthModel = mongoose.model('User', AuthSchema);
const AuthModel = mongoose.model('User', AuthSchema);




const AuthRegister = (app)=>{
  app.post('/register', async(req, res) => {
    try {
        const AuthData = new AuthModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        await AuthData.save();

        const DataStatus = {
            status: true,
            message: "Data Sent Successfully",
            data: req.body
        };

        res.json(DataStatus);
    } catch (error) {
        console.error("Register Error:", error); // <--- IMPORTANT for debugging
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});


   app.get('/get_users', async (req, res) => {
        
            const Data = await AuthModel.find(); 
            const DataStatus = {
                status: true,
                message: "Fetch Successfully",
                data: Data
            }
            // res.json(DataStatus);
            res.send("welcoe")
         
    });
}

export default AuthRegister