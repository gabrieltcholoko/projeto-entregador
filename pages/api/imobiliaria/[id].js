import conectarDB from "../../../lib/dbConnect"
import Imobiliaria from "../../../models/Imobiliaria"

export default async function handler(req, res) {
  
  await conectarDB();

  //GET api/imobiliaria/:id
  //DELETE api/imobiliaria/:id
  //PUT api/imobiliaria/:id

  const {method, query: {id},} = req;

  switch (method) {
    case "PUT":
      try {
        const imobiliaria = await Imobiliaria.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!imobiliaria) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: imobiliaria });
      } catch (error) {
        return res.status(404).json({ success: false, error });
      }
    case "DELETE":
        try {
          const imobiliaria = await Imobiliaria.findByIdAndDelete(id);
          if(!imobiliaria){
            return res.status(404).json({success: false});
          }
          return res.json({success: true, data: imobiliaria});

        } catch (error) {
            return res.status(404).json({success: false});
        }
    case "GET":
        try {
          const imobiliaria = await Imobiliaria.findById(id).lean();
            if (!imobiliaria) {
                return res.status(404).json({ success: false });
             }
      
             return res.json({ success: true, data: imobiliaria });
            } catch (error) {
              return res.status(404).json({ success: false });
            }
            default:
                return res
                  .status(500)
                  .json({ success: false, error: "Falla de servidor" });
  }
}