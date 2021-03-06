import conectarDB from "../../../lib/dbConnect"
import Corretor from "../../../models/Corretor"

export default async function handler(req, res) {
  
  await conectarDB();

  //post api/corretor

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const corretor = new Corretor(req.body);
        await corretor.save();

        return res.status(200).json({ success: true, corretor });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falla de servidor" });
  }
}