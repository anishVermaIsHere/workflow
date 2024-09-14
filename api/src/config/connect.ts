import mongoose from "mongoose";
import appConfig from "./appconfig";

export const dbConnection= async () => {
  try {
    await mongoose.connect(appConfig.dbUri); 
    console.log("***** DATABASE connected... *****");
  } catch (error) {
    console.log("***** DATABASE connection error... *****",  error);
  }
};

