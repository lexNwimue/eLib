
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const mongodb = 'mongodb://localhost/elibDB';

const userSchema = new Schema({
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
    role: {
        type: String,
        required: true,
        default: 'user',
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const getUserCount = async () => {
    try {
        await mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
        let result = await User.countDocuments({})
        return result;
    } catch (err) {
        console.error("Error encountered ", err);
    }
}

const getUsers = async () => {
    try {
        await mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
        let result = await User.find({})
        return result;
    } catch (err) {
        console.error("Error encountered getting users list: ", err);
    }
}

export default {
    User,
    getUsers,
    getUserCount
};