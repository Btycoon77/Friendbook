import UserModel from "../models/userModel.js";
import ErrorHandler from "../utilities/ErrorHandler.js";

import sendToken from "../utilities/sendToken.js";

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { username, firstname,lastname, password } = req.body;
    const user = await UserModel.create({
      username,
      firstname,
      lastname,
      password
    });
    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

// login user

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // checking if user has given password and email both
    if (!username || !password) {
      return next(new ErrorHandler("please enter email and password", 400));
    }
  
    const user = await UserModel.findOne({username }).select("+password");
  
    if (!user) {
      return next(new ErrorHandler("Invalid email or password,401"));
    }
  
    const isPasswordMatched = await user.matchPassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    sendToken(user, 200, res);
  } catch (error) {
      res.status(500).json(error)
  }
}
 