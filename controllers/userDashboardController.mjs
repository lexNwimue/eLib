

import bookModel from '../model/BookModel.mjs';
import userModel from '../model/UserModel.mjs';
import requestModel from '../model/RequestModel.mjs';

const users = await userModel.getUsers();
const userCount = await userModel.getUserCount();
const books = await bookModel.getBooks();
const bookCount = await bookModel.getBookCount();
const availableBooks = await bookModel.getAvailableBooks();
let requests;

const user_dashboard_get = async (req, res) => {
    requests = await requestModel.userRequests(req.user._id);
    res.render('user_dashboard', {
        title: 'Dashboard | User Profile',
        user: req.user,
        userCount,
        bookCount,
        requests
    });
}

const user_view_books_get = async (req, res) => {
    res.render('userViewBooks', {
        title: 'Dashboard | Book List',
        books,
        user: req.user,
        bookCount,
        requests
    });
}

const user_view_requests_get = async (req, res) => {
    res.render('userViewRequests', {
        title: 'Dashboard | Requests',
        user: req.user,
        availableBooks,
        bookCount,
        requests: requests || {} 
    });
}

const user_send_request_post = async (req, res) => {
    const { userID, username, bookID, bookTitle } = req.body;
    const newRequest = new requestModel.Requests({
        userID,
        username,
        bookID,
        bookTitle
    });

    // Check of User already requested that same book
    if (await requestModel.checkRequestValidity(newRequest.userID, newRequest.bookID)) {
        try {
            const result = await newRequest.save();
            res.json({success: result});            
        } catch (error) {
            
        }
    } else {
        res.json({ failed: 'Request already made...' });
    }
}

const user_cancel_request_delete = async (req, res) => {
    try {
        const userID = req.user._id;
        const requestID = req.body.id;
        const result = await requestModel.cancelRequest(userID, requestID);
        res.json(result);    
    } catch (error) {
        console.log(err);
        res.json({failed: err})
    }
    
}

export default {
    user_dashboard_get,
    user_view_books_get,
    user_view_requests_get,
    user_send_request_post,
    user_cancel_request_delete
};
