import mongoose from 'mongoose';
const Schmea = mongoose.Schema;

const AuthSchema = new Schmea({
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

const Auth = mongoose.model('User', AuthSchema);

export default Auth