import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import userRouter from "./user.routes";

router.get("/", (req, res) => {
  res.status(200).send("Hello! Home page of Snake Game App.");
});

router.use("/user", userRouter);

export default router;
