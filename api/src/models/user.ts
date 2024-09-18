import { model, Schema } from "mongoose";

const userSchema =  new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        image: { type: String }
    },
    {
        timestamps: true
    }
);

const UserModel = model("Users", userSchema);

export default UserModel;