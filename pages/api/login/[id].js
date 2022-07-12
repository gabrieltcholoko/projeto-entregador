import conectarDB from "../../../lib/dbConnect"
import Login from "../../../models/Login"

export default async function handler(req, res) {
  
  await conectarDB();

  //GET api/login/:id
  //DELETE api/login/:id
  //PUT api/login/:id

  const {method, query: {id},} = req;

  switch (method) {
    case "PUT":
      try {
        const login = await Login.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!login) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: login });
      } catch (error) {
        return res.status(404).json({ success: false, error });
      }
    case "DELETE":
        try {
          const login = await Login.findByIdAndDelete(id);
          if(!login){
            return res.status(404).json({success: false});
          }
          return res.json({success: true, data: login});

        } catch (error) {
            return res.status(404).json({success: false});
        }
    case "GET":
        try {
          const login = await Login.findById(id).lean();
            if (!login) {
                return res.status(404).json({ success: false });
             }
      
             return res.json({ success: true, data: login });
            } catch (error) {
              return res.status(404).json({ success: false });
            }
            default:
                return res
                  .status(500)
                  .json({ success: false, error: "Falla de servidor" });
  }
}