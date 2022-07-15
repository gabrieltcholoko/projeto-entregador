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
    corretor:{type: Schema.Types.ObjectId, ref: 'Corretor' },
  
}, {versionKey: false
});

export default mongoose.models.Postagem || mongoose.model("Postagem", PostagemSchema)