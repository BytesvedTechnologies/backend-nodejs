import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  profilePic: string;
  password: string;
  role: string;
  isEmailVerify: boolean;
}

const userSchema: Schema<UserInterface> = new Schema({
  firstName: { type: String, minlength: 3, required: true, maxlength: 100 },
  lastName: { type: String, minlength: 3, required: true, maxlength: 100 },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => /\S+@\S+\.\S+/.test(v),
      message: "Invalid email address format",
    },
  },
  mobile: {
    type: String,
    minlength: 10,
    maxlength: 10,
    unique: true,
    required: true,
    validate: {
      validator: (v: string) => /\d{10}/.test(v),
      message: "Mobile number must be exactly 10 digits",
    },
  },
  address: { type: String, required: true, minlength: 4, maxlength: 250 },
  profilePic: { type: String, required: true },
  password: { type: String, minlength: 6, required: true },
  role: { type: String, default: "User" },
  isEmailVerify: { type: Boolean, required: true, default: false },
});

userSchema.post(
  "save",
  function (error: any, doc: UserInterface, next: (err?: Error) => void) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      if (error.message.includes("mobileNumber")) {
        next(new Error("Mobile number is already used."));
      } else {
        next(error);
      }
    } else {
      next();
    }
  }
);

userSchema.post(
  "findOneAndUpdate",
  function (error: any, doc: UserInterface, next: (err?: Error) => void) {
    if (error.name === "MongoError" && error.code === 11000) {
      if (error.message.includes("mobileNumber")) {
        next(new Error("Mobile number is already used."));
      } else {
        next(error);
      }
    } else {
      next();
    }
  }
);

const User = mongoose.model<UserInterface>("Users", userSchema);

export default User;
