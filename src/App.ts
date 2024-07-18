import express, { Request, Response, NextFunction } from "express"; 
import dotenv from 'dotenv';
import connectDB from "./Config/connectDB";
import router from "./Routes";
dotenv.config();
const app = express()

const port = process.env.PORT || 3000;
const DATABASE_URL: string = process.env.DATABASE_URL as string;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB(DATABASE_URL)

app.use("/", router)

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err: any = new Error(`Can't find ${req.originalUrl} on the server.`);
    err.status = "Fail to load..";
    err.statusCode = 404;
    next(err);
  });
  
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    error.statusCode = error.statusCode || 400;
    error.status = error.status || "Error";
    res.status(error.statusCode).json({
      success: false,
      status: error.statusCode,
      message: error.message,
    });
  });

app.listen(port, ()=>{
    console.log(`Server is running on port number : ${port}`)
})