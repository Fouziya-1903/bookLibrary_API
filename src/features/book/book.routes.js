import { Router } from "express";
import { addBook,getAllBooks, getBook,bookUpdate } from "./book.controller.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/addBook",auth,addBook);
router.patch("/bookUpdate",auth,bookUpdate);


router.get("/getBook", getBook);
router.get("/getAllBooks",getAllBooks);


export default router;