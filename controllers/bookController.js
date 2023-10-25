import bookModel from "../models/bookModel.js";

const Book = {

    async createBook(req, res, next) {
        try {
            let reqJson = JSON.parse(JSON.stringify(req.body))
            let bookJson = {
                title: reqJson.title,
                author: reqJson.author,
                description: reqJson.description,
                publishedYear: reqJson.publishedYear,
                ISBN: reqJson.ISBN,
                date_time: new Date()
            }
            let bookDoc = await bookModel.create(bookJson);
            let response = {
                "status": 200,
                "message": "Book Created Successfully",
                "details": bookDoc
            }
            return res.send(response)
        }
        catch (err) {
            next(err);
        }
    },

    // Get All Books
    async getAllBooks(req, res, next) {
        try {
            let bookDoc = await bookModel.find({});
            let response = {
                "status": 200,
                "message": "DATA FOUND",
                "details": bookDoc
            }
            return res.send(response)
        }
        catch (err) {
            console.log(err);
        }
    },

    // Get by ISBC
    async getBookById(req, res) {

        try {
            const book = await bookModel.findOne({ ISBN: req.body.isbn })
            console.log("BOOKDOC", book)
            if (!book) {
                res.status(404).json({ error: 'Book not found' });
            } else {
                res.send({ status: 200, message: "DATA FOUND", details: book });
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Could not retrieve book' });
        }

    },

    // Update book details by ISBN
    async updateBook(req, res) {
        try {
          
            const book = await bookModel.findOne({ ISBN: req.body.ISBN });
            if (!book) {
              res.status(404).json({ error: 'Book not found' });
            } else {
              book.set(req.body);
              await book.save();
              res.send({ status: 204, message: "UPDATED", details: book });

        }
    }
        catch (err) {
            console.log("err",err);
            res.status(500).json({ error: err,message:'Could not update book' });
        }
    },

    // Delete book details by ISBN
    async deleteBook(req, res) {
        try {
            const book = await bookModel.findByIdAndDelete( req.params.id );
                res.send({ status: 200, message: "DELETED", details: await bookModel.find() });
        }
        catch(err) {
            res.status(500).json({ error: err,message:'Could not delete book' });
        }
    }
}

export default Book;