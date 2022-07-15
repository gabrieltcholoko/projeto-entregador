import Link from 'next/link';
import { getCsrfToken, getProviders, signIn, getSession } from "next-auth/react";
import {useState} from "react";

export default function Signin ({ csrfToken, providers }) {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [message, setMessage] = useState(null);

    const signinUser= async (e)=>{
        e.preventDefault();
        let option = {redirect: false,email,password}
        const res= await signIn("credentials", options)
        if (res?.error){
            setMessage
        }
        return Router.push("/")

    }
    return (
        <div className="login ">
            <div className="form-signin w-100 h-50 p-4 m-auto loginCentro">
                <form method="post" action="/api/auth/singnin/email">
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
                </form>

                <div className=" mb-3 textoCentro">
                    <Link href="/login/registrar/new">
                        <a className="registro" type="submit">Registrar-se</a>
                    </Link>
                </div>
                <p className="mt-5 mb-3 text-muted textoCentro">&copy; 2002–2022</p>

            </div>
        </div>
    )
};
