import mongoose from "mongoose";

const EmpresaSchema = new mongoose.Schema({
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
        required: [true, "Insira uma senha valida"],
    },
    telefone: {
        type: String,
        required: [true, "Insira um numero de Telefone"],
    },
  
}, {versionKey: false
});

export default mongoose.models.Empresas || mongoose.model("Empresas", EmpresaSchema)