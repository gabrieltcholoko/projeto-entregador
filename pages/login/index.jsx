import Link from 'next/link';
const Login = () => {

    return (
        <div className="login">
            <div className="form-signin w-100 h-50 p-4 m-auto loginCentro">
                <form>
                    <h1 className="h3 mb-3 fw-normal textoCentro">Please sign in</h1>

                    <div className="form-floating">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                        <label for="floatingPassword">Password</label>
                    </div>

                    <div className="checkbox mb-3 textoCentro">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <Link href="/">
                        <a className="w-100 btn btn-lg btn-primary " type="submit">Sign in</a>
                      </Link>
                    <p className="mt-5 mb-3 text-muted textoCentro">&copy; 2002–2022</p>
                </form>
            </div>
        </div>
    )
}

export default Login