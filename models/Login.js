import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail, "Please enter valid email address"],
    },
    password: {
        type: String,
        required: [true, "Insira uma senha"],
    },
    resetToken: { type: String },
    update: { type: String },
    validEmail: { type: String, default: "not" },
    emailToken: { type: String },
  
}, {versionKey: false
});

export default mongoose.models.Login || mongoose.model("Login", LoginSchema)