import conectarDB from "../../../lib/dbConnect"
import Postagem from "../../../models/Postagem"

export default async function handler(req, res) {
  
  await conectarDB();

  //GET api/postagem/:id
  //DELETE api/postagem/:id
  //PUT api/postagem/:id

  const {method, query: {id},} = req;

  switch (method) {
    case "PUT":
      try {
        const postagem = await Postagem.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!postagem) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: postagem });
      } catch (error) {
        return res.status(404).json({ success: false, error });
      }
    case "DELETE":
        try {
          const postagem = await Postagem.findByIdAndDelete(id);
          if(!postagem){
            return res.status(404).json({success: false});
          }
          return res.json({success: true, data: postagem});

        } catch (error) {
            return res.status(404).json({success: false});
        }
    case "GET":
        try {
          const postagem = await Postagem.findById(id).lean();
            if (!postagem) {
                return res.status(404).json({ success: false });
             }
      
             return res.json({ success: true, data: postagem });
            } catch (error) {
              return res.status(404).json({ success: false });
            }
            default:
                return res
                  .status(500)
                  .json({ success: false, error: "Falla de servidor" });
  }
}