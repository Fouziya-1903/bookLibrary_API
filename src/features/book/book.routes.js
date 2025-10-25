import { Router } from "express";
import { addBook,getAllBooks } from "./book.controller.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/addBook",auth,addBook);


router.get("/getAllBooks",getAllBooks);

export default router;