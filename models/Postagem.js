import mongoose, { Schema }  from "mongoose";


const PostagemSchema = new mongoose.Schema({
    titulo:{
        type: String,
        required:[true, "Insira um Titulo"],
    },
    descricao: {
        type: String,
        required: [true, "Insira uma dedscricao"],
    },
    valor:{
        type: Number, 
    },
    login:{type: Schema.Types.ObjectId, ref: 'Login' },
  
}, {versionKey: false
});

export default mongoose.models.Postagem || mongoose.model("Postagem", PostagemSchema)