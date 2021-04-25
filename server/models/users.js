import mongoose from "mongoose";
const Schema = mongoose.Schema;

//Create User Schema
const UserSchema = new Schema({
      name: {
            type: String,
            required: true,
      },
      email: {
            type: String,
            required: true,
      },
      password: {
            type: String,
            required: true,
      },
});
const User = mongoose.model("users", UserSchema);
//Export the Schema so that it can be used outside
export default User;