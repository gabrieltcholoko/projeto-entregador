import conectarDB from "../../../lib/dbConnect"

export default async function handler(req, res) {
  
  await conectarDB();

  //post api/login

  const body = req.body;
  const novoLogin = {user:body.user, password:body.password}
  const login = await LoginModel.create(novoLogin)
  const novoUser={
    nome: body.nome,
    cidade: body.cidade,
    login: login
  }
  const userNoBanco = await UserModel.create(novoUser)
  

}