import { Router } from "express";
import { addBook,getAllBooks } from "./book.controller.js";

const router = Router();

router.post("/addBook",addBook);





router.get("/getAllBooks",getAllBooks);

export default router;