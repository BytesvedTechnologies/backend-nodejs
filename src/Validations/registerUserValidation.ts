import Joi from "joi";
import validationMessages from "../Utils/validationMessages";

const registerUserValidation = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "any.required": validationMessages.REQUIRED.replace("ADD:", "First Name"),
      "string.min": validationMessages.STRING_MIN.replace("ADD:", "First Name"),
      "string.max": validationMessages.STRING_MAX.replace("ADD:", "First Name"),
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "First Name"
      ),
    }),
  lastName: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Last Name"),
      "string.min": validationMessages.STRING_MIN.replace("ADD:", "Last Name"),
      "string.max": validationMessages.STRING_MAX.replace("ADD:", "Last Name"),
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Last Name"
      ),
    }),
  email: Joi.string()
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
  mobile: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Mobile number"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Mobile number"
      ),
      "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "Mobile number"
      ),
      "string.pattern.base": "Invalid mobile number format",
      "string.length": "Mobile number must be exactly 10 digits",
    }),
  address: Joi.string()
    .min(4)
    .max(250)
    .required()
    .messages({
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Address"),
      "string.min": validationMessages.STRING_MIN.replace("ADD:", "Address"),
      "string.max": validationMessages.STRING_MAX.replace("ADD:", "Address"),
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Address"),
    }),
  password: Joi.string()
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

export default registerUserValidation;
