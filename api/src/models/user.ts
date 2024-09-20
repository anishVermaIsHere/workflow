"use strict";
import { model, Schema, Model } from "mongoose";
import { IUser } from "../shared/types/models.js";

enum ROLES {
    ADMIN  = "ADMIN",
    USER = "USER"
}

const userSchema =  new Schema<IUser, Model<IUser>>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, enum: ROLES, required: true },
    },
    {
        timestamps: true
    }
);

const UserModel = model("Users", userSchema);

export default UserModel;