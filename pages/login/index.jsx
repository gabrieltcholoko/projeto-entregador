
const Login = () => {

    return (
        <div>

        
        <div className="container d-flex justify-content-center">
            <div className="card mt-5 w-50">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="nickName">Usuário</label>
                            <input type="text" className="form-control"id="nickName" placeholder="Usuário" />
                        </div>
                        <div className="form-inline">
                            <label htmlFor="password">Senha</label>
                            <input type="password" className="form-control mb-2" id="password" placeholder="Senha"/>
                        </div>
                        <button type="submit" className="btn btn-primary ">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login