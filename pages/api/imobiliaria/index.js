import conectarDB from "../../../lib/dbConnect"
import Imobiliaria from "../../../models/Imobiliaria"

export default async function handler(req, res) {
  
  await conectarDB();

  //post api/movie

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const imobiliaria = new Imobiliaria(req.body);
        await imobiliaria.save();

        return res.status(200).json({ success: true, imobiliaria });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falla de servidor error" });
  }
}