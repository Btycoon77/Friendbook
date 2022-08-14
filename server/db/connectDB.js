import mongoose from "mongoose";


const connectDb = () => {
    mongoose
      .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connection succesfull");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
export default connectDb;