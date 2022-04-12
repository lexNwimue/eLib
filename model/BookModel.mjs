import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mongodb = "mongodb://localhost/elibDB";
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Book = mongoose.model("Book", bookSchema);

const getBookCount = async () => {
  try {
    await mongoose.connect(mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let result = await Book.countDocuments({});
    return result;
  } catch (err) {
    console.error("Error encountered ", err);
  }
};

const getBooks = async () => {
  try {
    await mongoose.connect(mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let result = await Book.find({});
    return result;
  } catch (err) {
    console.error("Error encountered getting book list: ", err);
  }
};

const getBookByID = async (id) => {
  try {
    await mongoose.connect(mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let result = await Book.findOne({ _id: id });
    return result;
  } catch (err) {
    console.log("Errog getting book with ID: " + id);
  }
};

const getAvailableBooks = async () => {
  try {
    await mongoose.connect(mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let result = await Book.find({ status: "Available" });
    return result;
  } catch (err) {
    console.error("Error encountered getting book list: ", err);
  }
};

const updateBook = async (id, others) => {
  try {
    const result = await Book.findByIdAndUpdate(id, others);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const deleteBook = async (id) => {
  try {
    const result = await Book.findByIdAndDelete({ _id: id });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export default {
  Book,
  getBooks,
  getBookByID,
  getBookCount,
  getAvailableBooks,
  updateBook,
  deleteBook,
};
