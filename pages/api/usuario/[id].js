import conectarDB from "../../../lib/dbConnect"
import Usuario from "../../../models/Usuario"

export default async function handler(req, res) {
  
  await conectarDB();

  //GET api/usuario/:id
  //DELETE api/usuario/:id
  //PUT api/usuario/:id

  const {method, query: {id},} = req;

  switch (method) {
    case "PUT":
      try {
        const usuario = await Usuario.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!usuario) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: usuario });
      } catch (error) {
        return res.status(404).json({ success: false, error });
      }
    case "DELETE":
        try {
          const usuario = await Usuario.findByIdAndDelete(id);
          if(!usuario){
            return res.status(404).json({success: false});
          }
          return res.json({success: true, data: usuario});

        } catch (error) {
            return res.status(404).json({success: false});
        }
    case "GET":
        try {
          const usuario = await Usuario.findById(id).lean();
            if (!usuario) {
                return res.status(404).json({ success: false });
             }
      
             return res.json({ success: true, data: usuario });
            } catch (error) {
              return res.status(404).json({ success: false });
            }
            default:
                return res
                  .status(500)
                  .json({ success: false, error: "Falla de servidor" });
  }
}