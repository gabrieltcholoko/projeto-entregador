import mongoose from "mongoose";

const CorretorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Insira um nome Valido"],
    },
    creci: {
        type: String,
        required: [true, "Insira um numero valido"],
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
    usuario:{type: Schema.Types.ObjectId,
        ref: 'Usuario' },
  
}, {versionKey: false
});

export default mongoose.models.Corretor || mongoose.model("Corretor", CorretorSchema)