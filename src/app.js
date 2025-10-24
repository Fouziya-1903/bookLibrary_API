import express from "express"
import userRoutes from "./features/user/user.routes.js"
import bookRoutes from "./features/book/book.routes.js";
const app = express();

app.use(express.json());


app.get("/",(req, res)=>{
    res.json({ message: " Book Library APIs are running"});
});

//User routes module

app.use("/api/users",userRoutes);


// bookroutes module

app.use("/api/books",bookRoutes);


export default app;
