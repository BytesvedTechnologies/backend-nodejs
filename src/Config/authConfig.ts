import { Request, Response, NextFunction } from "express";
import User, { UserInterface } from "../Models/userModel";
import { successResponse, errorResponse } from "../Utils/responseMessages";
import jwt from "jsonwebtoken";

const emailTokenVerify = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const verifyEmailToken: string = req.body.emailToken;

    if (!verifyEmailToken) {
      res.json(
        errorResponse("Authentication Required, please provide a valid token.")
      );
    }

    const jwtUserObj: any = await jwt.verify(
      verifyEmailToken,
      process.env.EMAIL_TOKEN_KEY as string
    );
    const user = await User.findOne({ _id: jwtUserObj.user_id });

    if (!user) {
      throw new Error("User Not Found, Please Register to Access this Service");
    }

    req.user = user;
    console.log("Success! E-Mail token verification completed successfully.");
    next();
  } catch (error) {
    console.log("Oops, there was an issue with E-Mail verification." + error);
    next(error);
  }
};

const verifyToken = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let verifyToken: string =
      req.headers["authorization"] || req.body.token || req.query.token;

    if (req.headers["authorization"]) {
      verifyToken = verifyToken.substring(7);
    }

    if (!verifyToken) {
      res.json(
        errorResponse("Authentication Required, please provide a valid token.")
      );
    }

    const jwtUserObj: any = await jwt.verify(
      verifyToken,
      process.env.LOGIN_TOKEN_KEY as string
    );

    const user = await User.findOne({ _id: jwtUserObj.user_id });

    if (!user) {
      throw new Error("User Not Found, Please Register to Access this Service");
    }

    req.user = user;
    console.log("Success! Token verification completed successfully.");
    next();
  } catch (error) {
    console.log("Oops, there was an issue with token verification." + error);
    next(error);
  }
};

export default { emailTokenVerify, verifyToken };
