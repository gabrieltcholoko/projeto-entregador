import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Signin({ csrfToken}) {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [message, setMessage] = useState(null);

    const signinUser = async (e) => {
        e.preventDefault();
        let options = {redirect: false, email, password }
        const res = await signIn("credentials", options)
        setMessage(null)
        if(res?.error){
            setMessage(res.error)
        }   
    }
    return (
        <div className="login ">
            <div className="form-signin w-100 h-50 p-4 m-auto loginCentro">
                <form method="post" action="/api/auth/signin/">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

                    <h1 className="h3 mb-3 fw-normal textoCentro">Please sign in</h1>
                    <div className="">
                        <label >
                            Email address
                            <input type="email" id="email" className="form-control" name='email' value={email} onChange={e => setEmail(e.target.value)} />
                        </label>
                    </div>
                    <div className="">
                        <label>
                            Password
                            <input type="password" id='password' className="form-control" name='email' value={password} onChange={e => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <p style={{color: 'red'}}>{message}</p>
                    <button onClick={(e) =>signinUser(e)}>Logar</button>
                </form>

                
                
                

            </div>
        </div>
    )
};
