import Joi from "joi";
import validationMessages from "../Utils/validationMessages";

const loginValidation = Joi.object({
  emailAddress: Joi.string()
    .email()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "E Mail Address"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "E Mail Address"
      ),
      "string.email": validationMessages.EMAIL.replace(
        "ADD:",
        "E Mail Address"
      ),
      "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "E Mail Address"
      ),
    }),
    password: Joi
    .string()
    .required()
    .min(6)
    .max(20)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};':\",./<>?])"
      )
    )
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Password"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Password"),
      "string.min": validationMessages.STRING_MIN.replace("ADD:", "Password"),
      "string.max": validationMessages.STRING_MAX.replace("ADD:", "Password"),
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
    }),
});

export default loginValidation;
