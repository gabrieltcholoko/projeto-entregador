import conectarDB from "../../../lib/dbConnect"
import Postagem from "../../../models/Postagem"

export default async function handler(req, res) {
  
  await conectarDB();

  //post api/postagem

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const postagem = new Postagem(req.body);
        await postagem.save();

        return res.status(200).json({ success: true, postagem });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falla de servidor" });
  }
}