import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Insira um nome Valido"],
    },
    cidade: {
        type: String,
        required: [true, "Insira uma Cidade Valida"],
    },
    email: {
        type: String,
        required: [true, "Insira um E-Mail Valido"],
    },
    telefone: {
        type: String,
        required: [true, "Insira um numero de Telefone"],
    },
  
}, {versionKey: false
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema)