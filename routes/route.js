import express from "express";
import Book from "../controllers/bookController.js";

let router = express.Router();

router.post("/createBook",Book.createBook);
router.get("/getAllBooks",Book.getAllBooks);
router.post("/getBookById",Book.getBookById);
router.put("/updateBook",Book.updateBook);
router.delete("/deleteBook/:id",Book.deleteBook);

export default router;