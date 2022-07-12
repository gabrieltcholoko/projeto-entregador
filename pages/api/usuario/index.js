import conectarDB from "../../../lib/dbConnect"
import Usuario from "../../../models/Usuario"

export default async function handler(req, res) {
  
  await conectarDB();

  //post api/usuario

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const usuario = new Usuario(req.body);
        await usuario.save();

        return res.status(200).json({ success: true, usuario });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falla de servidor" });
  }
}