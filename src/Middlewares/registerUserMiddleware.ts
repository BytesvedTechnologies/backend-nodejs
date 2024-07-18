import { Request, Response, NextFunction } from "express";
import registerUserValidation from "../Validations/registerUserValidation";
import { errorResponse } from "../Utils/responseMessages";

const registerUserMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const validationResult = registerUserValidation.validate(req.body, {
    abortEarly: false,
  });
  if (validationResult.error) {
    const errMessage = validationResult.error.details[0].message;
    res.send(errorResponse(errMessage));
  } else {
    next();
  }
};

export default registerUserMiddleware;
