import Joi from "joi";
import validationMessages from "../Utils/validationMessages";

const verifyEmailValidation = Joi.object({
  emailToken: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "E Mail Token"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "E Mail Token"
      ),
      "string.email": validationMessages.EMAIL.replace("ADD:", "E Mail Token"),
      "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "E Mail Token"
      ),
    }),
});

export default verifyEmailValidation;
