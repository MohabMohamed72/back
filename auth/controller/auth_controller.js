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
const AuthModel = mongoose.models.User || mongoose.model('User', AuthSchema);




const AuthRegister = (app)=>{
    app.post('/register', (req, res) => {
        const DataStatus = {
            status: true,
            message:"Data Send Successfully",
            data:req.body
        }
        const AuthData = new AuthModel();
        AuthData.name = req.body.name;
        AuthData.email = req.body.email;
        AuthData.password = req.body.password;
        AuthData.save();
        res.json(DataStatus);
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