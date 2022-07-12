import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
    login: {
        type: String,
        required: [true, "Insira um login"],
    },
    password: {
        type: String,
        required: [true, "Insira uma senha"],
    },
  
}, {versionKey: false
});

export default mongoose.models.Login || mongoose.model("Login", LoginSchema)