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
}

export default AuthRegister