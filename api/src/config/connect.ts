"use strict";
import mongoose from "mongoose";
import appConfig from "./appconfig.js";

export const dbConnection= async () => {
  try {
    await mongoose.connect(appConfig.dbUri); 
    console.log("***** DATABASE connected... *****");
  } catch (error) {
    console.log("***** DATABASE connection error... *****",  error);
  }
};

