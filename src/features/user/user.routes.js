import { Router } from "express";
import { SignUp,login,home } from "./user.controller.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/signup",SignUp);
router.post("/login",login);
router.get("/home",auth,home);

export default router;