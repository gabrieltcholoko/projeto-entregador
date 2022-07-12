import mongoose from "mongoose";

const ImobiliariaSchema = new mongoose.Schema({
    namejuridico: {
        type: String,
        required: [true, "Insira um nome Valido"],
    },
    namefantasia: {
        type: String,
        required: [true, "Insira um nome Valido"],
    },
    cnpj: {
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
    password: {
        type: String,
    },
    telefone: {
        type: String,
        required: [true, "Insira um numero de Telefone"],
    },
  
}, {versionKey: false
});

export default mongoose.models.Imobiliaria || mongoose.model("Imobiliaria", ImobiliariaSchema)