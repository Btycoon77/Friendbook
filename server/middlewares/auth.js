import UserModel from "../models/userModel";
import ErrorHandler from "../utils/errorHandler";
import { jwt } from 'jsonwebtoken';
import catchAsyncError from "./catchAsyncError";

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const {token} = req.cookies;
  console.log(token);

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = verify(token, process.env.JWT_SECRET);
  // everything is stored in req.user when user logs in ie credentials;
  console.log(req.user);
  req.user = await findById(decodedData.id);
  next();
});

export function authorizeRoles(...roles) {
  return (req, res, next) => {
    // basically accessging the attributes of the user(role) by req.user.role;
    if (!roles.includes(req.user.role)) {
     return next (new ErrorHandler(
        `Role:${req.user.role} is not allowed to access this resource`,403
      ));
    }
    next();
  };
}
