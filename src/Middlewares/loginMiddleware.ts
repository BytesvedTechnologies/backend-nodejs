import { Request, Response, NextFunction } from "express";
import loginValidation from "../Validations/loginValidation";
import { errorResponse } from "../Utils/responseMessages";

const loginMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const validationResult = loginValidation.validate(req.body, {
    abortEarly: false,
  });
  if (validationResult.error) {
    const errMessage = validationResult.error.details[0].message;
    res.send(errorResponse(errMessage));
  } else {
    next();
  }
};

export default loginMiddleware;
