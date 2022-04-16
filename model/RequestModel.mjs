
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mongodb = 'mongodb://localhost/elibDB';
const requestsSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    bookID: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: false,
        default: 'Pending'
    }

}, { timestamps: true });
const Requests = mongoose.model('Requests', requestsSchema);

const getRequests = async () => {
    try {
        await mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
        let result = await Requests.find({})
        return result;
    } catch (err) {
        console.error("Error encountered getting requests: ", err);
    }
}

const checkRequestValidity = async (uID, bID) => {
    try {
        // Ensure user does not request same book twice or more 
        await mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
        let result = await Requests.find({ $and: [{ userID: uID }, { bookID: bID }] });
        if (result.length == 0) { // Request doesn't exist for that book from said user: valid request
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}


// Get requests for a specific user
const userRequests = async (uID) => {
    try {
        await mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
        let result = await Requests.find({ userID: uID });
        return result;
    } catch (err) {
        console.log(err);
    }
}

const cancelRequest = async (uID, reqID) => {
    try {
        await mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
        let result = await Requests.findOneAndDelete({ $and: [{ userID: uID }, { _id: reqID }] });
        return result;
    } catch (err) {
        console.log(err);
    }
}

const getSpecificRequest = async (id) => {
    try{
    //    await mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});
        let request = await Requests.findById({_id: id});
        return request;
    } catch(err){
        console.log(err);
    }
}


export default {
    Requests,
    getRequests,
    checkRequestValidity,
    userRequests,
    cancelRequest,
    getSpecificRequest
};