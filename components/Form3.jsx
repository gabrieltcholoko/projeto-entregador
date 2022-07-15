import { useRouter } from "next/router";
//import Link from "next/link";
import { useState } from "react";

const Form = ({formData, forNewLogin = true}) => {

    const router = useRouter();

    const [form, setForm] = useState({
        email: formData.email,
        password: formData.password
    })

    const [message, setMenssage] = useState([]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };
    

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(forNewLogin){
            postData();
        }else{
            putData(form);
        } 
    };

    const putData = async (form) => {
        setMenssage([]);
        const {id} = router.query;
        try {
            const res = await fetch(`/api/login/${id}`, {
                 method: "PUT",
                 headers: {
                      "Content-type": "application/json",
                  },
                   body: JSON.stringify(form),
              });

             const data = await res.json();
             console.log(data);

             if(!data.success){
                 for (const key in data.error.errors) {
                       let error = data.error.errors[key]
                      setMenssage(oldmenssage => [
                          ...oldmenssage,
                         {message: error.message},
                      ]);
                   }
             }else{
                setMenssage([]);
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const postData = async () => {
        try {
            console.log(form);
                const res = await fetch("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(form),
                });

                const data = await res.json();
                console.log(data);

                if(!data.success){
                    for (const key in data.error.errors) {
                        let error = data.error.errors[key]
                        setMenssage(oldmenssage => [
                            ...oldmenssage,
                            {message: error.message},
                        ]);
                    }
                }else{
                    router.push("/");
                }
        } catch (error) {
            console.log(error);
        }
    };


    return(
        <form onSubmit={handleSubmit}>
                <input className="form-control my-2" type="text" placeholder="Email@.com" autoComplete="off" name="email" required value={form.email} onChange={handleChange}/>
                <input className="form-control my-2" type="password" placeholder="Senha" autoComplete="off" name="password" required value={form.password} onChange={handleChange}/>
                <button className="btn btn-dark w-100" type="submit">{forNewLogin ? "Cadastrar" : "Cadastrar"}</button>
                {message.map(({ message }) => (
                    <p key={message}>{message}</p>
                ))}
            </form>
    );
};

export default Form;