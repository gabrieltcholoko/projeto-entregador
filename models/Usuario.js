import mongoose, { Schema } from "mongoose";

const UsuarioSchema = new mongoose.Schema({
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
    login:{type: Schema.Types.ObjectId, ref: 'Login' },
    
}, {versionKey: false
});

export default mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema)