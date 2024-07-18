import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import User, { UserInterface } from "../Models/userModel";
import { successResponse, errorResponse } from "../Utils/responseMessages";
import jwt from "jsonwebtoken";
import emailVerificationMail from "../Config/mailConfig";
import dotenv from "dotenv";
dotenv.config();

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { firstName, lastName, email, mobile, address, password } = req.body;

    const lowerEmailId = email.toLowerCase();
    const alreadyRegistered = await User.findOne({
      email: lowerEmailId,
    });

    if (alreadyRegistered) {
      throw new Error(`User ${lowerEmailId} already registered.`);
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const newUser = new User({
      firstName,
      lastName,
      email: lowerEmailId,
      mobile,
      address,
      profilePic:"localhost",
      password: hashedPassword,
    });

    const verifyEmailToken = jwt.sign(
      {
        user_id: newUser._id,
      },
      process.env.EMAIL_TOKEN_KEY as string,
      {
        expiresIn: "24h",
      }
    );
    await emailVerificationMail(firstName, lowerEmailId, verifyEmailToken);
    await newUser.save();

    res.json(
      successResponse(
        newUser,
        201,
        "Great news! The user registration process was a success!"
      )
    );
  } catch (error) {
    console.log("Oops! Something went wrong during registration." + error);
    next(error);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { emailAddress, password } = req.body;
    const lowerEmailId = emailAddress.toLowerCase();

    const user = await User.findOne({ emailAddress: lowerEmailId });
    if (!user) {
      throw new Error(`User ${lowerEmailId} not found.`);
    }

    if (user.isEmailVerify == false) {
      throw new Error("Please verify E mail address.");
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    if (hashedPassword !== user.password) {
      throw new Error("Invalid password.");
    }

    const loginToken = jwt.sign(
      {
        user_id: user._id,
      },
      process.env.LOGIN_TOKEN_KEY as string,
      {
        expiresIn: "12h",
      }
    );
    const response = {
      user,
      loginToken,
    };

    res.json(successResponse(response, 200, "Login successful"));
  } catch (error) {
    console.log("Error during login:", error);
    next(error);
  }
};

const verifyEmail = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reqUser: any = req.user;
    const user: any = await User.findOneAndUpdate(
      { _id: reqUser._id },
      { $set: { isEmailVerify: true } },
      { new: true }
    );

    res.json(successResponse(user, 200, "E-Mail verify!"));
  } catch (error) {
    console.log("Error during email verification:", error);
    next(error);
  }
};

export default { registerUser, login, verifyEmail };
