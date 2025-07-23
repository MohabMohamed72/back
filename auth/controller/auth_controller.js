import Auth from '../model/auth_model.js'
const AuthRegister = (app)=>{
    app.post('/register', (req, res) => {
        const DataStatus = {
            status: true,
            message:"Data Send Successfully",
            data:req.body
        }
        const AuthData = new Auth();
        AuthData.name = req.body.name;
        AuthData.email = req.body.email;
        AuthData.password = req.body.password;
        AuthData.save();
        res.json(DataStatus);
    });

   app.get('/get_users', async (req, res) => {
        try {
            const Data = await Auth.find(); 
            const DataStatus = {
                status: true,
                message: "Fetch Successfully",
                data: Data
            }
            res.json(DataStatus);
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "Error fetching data",
                error: error.message
            });
        }
    });
}

export default AuthRegister