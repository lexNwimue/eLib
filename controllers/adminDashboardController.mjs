import bookModel from "../model/BookModel.mjs";
import userModel from "../model/UserModel.mjs";
import requestModel from '../model/RequestModel.mjs'

const users = await userModel.getUsers();
const userCount = await userModel.getUserCount();
const books = await bookModel.getBooks();
const bookCount = await bookModel.getBookCount();

// Route handling functions
const view_user_get = (req, res) => {
  res.render("allUsers", {
    user: req.user,
    title: "Dashboard | Users List",
    userCount,
    bookCount,
    userCount,
    users,
  });
};

const view_dashboard = (req, res) => {
  res.render("admin_dashboard", {
    users,
    user: req.user,
    userCount,
    bookCount,
    title: "Admin Dashboard",
  });
};

const view_all_books_get = (req, res) => {
  res.render("allBooks", {
    users,
    user: req.user,
    userCount,
    books,
    bookCount,
    title: "Dashboard | Book List",
  });
};

const view_book_get = async (req, res) => {
  const bookID = req.params.id;
  const book = await bookModel.getBookByID(bookID);
  res.render("bookDetails", {
    book,
    title: book.title,
  });
};

const add_book_post = (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const publisher = req.body.publisher;
  const categories = req.body.categories;
  const status = req.body.status;

  const newBook = new bookModel.Book({
    title: title,
    author: author,
    publisher: publisher,
    categories: categories,
    status: status,
    books,
  });

  newBook
    .save()
    .then((book) => {
      console.log(newBook.title + " saved to DB");
      //req.flash('success_msg', 'You have successfully registered');
      res.json(book);
    })
    .catch((e) => res.json(e));
};
const edit_book_post = async (req, res) => {
  try {
    const id = req.params.id;
    const edit = {};
    edit.title = req.body.title;
    edit.author = req.body.author;
    edit.publisher = req.body.publisher;
    edit.categories = req.body.categories;
    edit.status = req.body.status;

    const result = await bookModel.updateBook(id, edit);
    console.log("Result: " + result);
    res.json({success: result});
  } catch (err) {
      console.log(err);
      res.json({failed: err})
  }
};

const delete_book_post = async (req, res) => {
  const id = req.body.id;
  const response = await bookModel.deleteBook(id);
  res.json(response);
};

const view_requests = async (req, res) => {
  const userRequests = await requestModel.getRequests();
  res.render("pendingRequests", {
    users,
    user: req.user,
    userCount,
    books,
    bookCount,
    title: "Dashboard | Requests",
    userRequests
  });
};

// View a specific request using request id
const view_specific_request = async (req, res) => {
  const id = req.params.id;
  const request = await requestModel.getSpecificRequest(id);
  res.render('requestDetails', {
    request,
    title: 'Request', 
    user: req.user,
    users,
    books
  });
  
}

const approve_request = async (req, res) => {
  const {id} = req.body;
  console.log(id);
  const result = await requestModel.changeStatus2Approved(id);
  res.json(result);
}


export default {
  view_dashboard,
  view_user_get,
  view_all_books_get,
  view_book_get,
  edit_book_post,
  delete_book_post,
  add_book_post,
  view_requests,
  view_specific_request,
  approve_request
};
