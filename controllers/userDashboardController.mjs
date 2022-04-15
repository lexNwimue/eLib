

import bookModel from '../model/BookModel.mjs';
import userModel from '../model/UserModel.mjs';
import requestModel from '../model/RequestModel.mjs';

const users = await userModel.getUsers();
const userCount = await userModel.getUserCount();
const books = await bookModel.getBooks();
const bookCount = await bookModel.getBookCount();
const availableBooks = await bookModel.getAvailableBooks();

const user_dashboard_get = (req, res) => {
    res.render('user_dashboard', {
        title: 'Dashboard | User Profile',
        user: req.user,
        userCount,
        bookCount
    });
}

const user_view_books_get = async (req, res) => {
    res.render('userViewBooks', {
        title: 'Dashboard | Book List',
        books,
        user: req.user,
        bookCount
    });
}

const user_view_requests_get = async (req, res) => {
    const requests = await requestModel.userRequests(req.user._id);
    res.render('userViewRequests', {
        title: 'Dashboard | Requests',
        user: req.user,
        availableBooks,
        bookCount,
        requests: requests || {} 
    });
}

const user_send_request_post = async (req, res) => {
    const { userID, bookID, title } = req.body;
    const newRequest = new requestModel.Requests({
        userID,
        bookID,
        title
    });

    // Check of User already requested that same book
    if (await requestModel.checkRequestValidity(newRequest.userID, newRequest.bookID)) {
        try {
            const result = await newRequest.save();
            console.log('Request for ' + newRequest.title + ' made successfull!');
            console.log(result);
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

