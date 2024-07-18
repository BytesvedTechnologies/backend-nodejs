import { Request, Response, NextFunction } from "express";
import verifyEmailValidation from "../Validations/verifyEmailValidation";
import { errorResponse } from "../Utils/responseMessages";

const verifyEmailMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const validationResult = verifyEmailValidation.validate(req.body, {
    abortEarly: false,
  });
  if (validationResult.error) {
    const errMessage = validationResult.error.details[0].message;
    res.send(errorResponse(errMessage));
  } else {
    next();
  }
};

export default verifyEmailMiddleware;
