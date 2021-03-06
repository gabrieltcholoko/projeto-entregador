import conectarDB from "../../../lib/dbConnect"
import Corretor from "../../../models/Corretor"

export default async function handler(req, res) {
  
  await conectarDB();

  //GET api/corretor/:id
  //DELETE api/corretor/:id
  //PUT api/corretor/:id

  const {method, query: {id},} = req;

  switch (method) {
    case "PUT":
      try {
        const corretor = await Corretor.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!corretor) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: corretor });
      } catch (error) {
        return res.status(404).json({ success: false, error });
      }
    case "DELETE":
        try {
          const corretor = await Corretor.findByIdAndDelete(id);
          if(!corretor){
            return res.status(404).json({success: false});
          }
          return res.json({success: true, data: corretor});

        } catch (error) {
            return res.status(404).json({success: false});
        }
    case "GET":
        try {
          const corretor = await Corretor.findById(id).lean();
            if (!corretor) {
                return res.status(404).json({ success: false });
             }
      
             return res.json({ success: true, data: corretor });
            } catch (error) {
              return res.status(404).json({ success: false });
            }
            default:
                return res
                  .status(500)
                  .json({ success: false, error: "Falla de servidor" });
  }
}