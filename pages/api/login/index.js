import conectarDB from "../../../lib/dbConnect"
import Login from "../../../models/Login"

export default async function handler(req, res) {
  
  await conectarDB();

  //post api/login

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const login = new login(req.body);
        await login.save();

        return res.status(200).json({ success: true, login });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falla de servidor" });
  }
}