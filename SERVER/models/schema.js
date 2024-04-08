const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    availability_status: {
        type: String,
        enum: ["available", "not available"]
    }
});

const Book = mongoose.model("Book", bookSchema);

const memberSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    books_borrowed: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    }]
}, { versionKey: false });

const Member = mongoose.model("Member", memberSchema);

const adminSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    }
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Book, Member, Admin };
