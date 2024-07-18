import express, { Router } from "express";
const router: Router = express.Router();
import registerUserMiddleware from "../Middlewares/registerUserMiddleware";
import loginMiddleware from "../Middlewares/loginMiddleware";
import verifyEmailMiddleware from "../Middlewares/verifyEmailMiddleware";
import userController from "../Controllers/userController";
import auth from "../Config/authConfig";

router.post("/create", registerUserMiddleware, userController.registerUser);
router.post("/login", loginMiddleware, userController.login);
router.post(
  "/verify-email",
  verifyEmailMiddleware,
  auth.emailTokenVerify,
  userController.verifyEmail
);

export default router;
