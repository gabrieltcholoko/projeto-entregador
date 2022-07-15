import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

const Form = ({formData, forNewCorretor = true}) => {

    const router = useRouter();

    const [form, setForm] = useState({
        name: formData.name,
        creci: formData.creci,
        cidade: formData.cidade,
        email: formData.email,
        telefone: formData.telefone,
        
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
        if(forNewCorretor){
            postData();
        }else{
            putData(form);
        } 
    };

    const putData = async (form) => {
        setMenssage([]);
        const {id} = router.query;
        try {
            const res = await fetch(`/api/corretor/${id}`, {
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
                router.push("/admin/listarcorretor");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const postData = async () => {
        try {
            console.log(form);
                const res = await fetch("/api/corretor", {
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
                    router.push("/admin/listarcorretor");
                }
        } catch (error) {
            console.log(error);
        }
    };


    return(
        <form onSubmit={handleSubmit}>
                <input className="form-control my-2" type="text" placeholder="Nome" autoComplete="off" name="name" required value={form.name} onChange={handleChange}/>
                <input className="form-control my-2" type="text" placeholder="CRECI" autoComplete="off" name="creci" required value={form.creci} onChange={handleChange}/>
                <input className="form-control my-2" type="text" placeholder="Cidade" autoComplete="off" name="cidade" required value={form.cidade} onChange={handleChange}/>
                <input className="form-control my-2" type="text" placeholder="E-mail" autoComplete="off" name="email" required value={form.email} onChange={handleChange}/>
                <input className="form-control my-2" type="text" placeholder="Telefone" autoComplete="off" name="telefone" required value={form.telefone} onChange={handleChange}/>
                
                <button className="btn btn-dark w-100" type="submit">{forNewCorretor ? "Enviar" : "Editar"}</button>
                <Link href="/admin/listarcorretor">
                    <a className="btn btn-dark w-100 my-2">Cancelar</a>
                </Link>
                {message.map(({ message }) => (
                    <p key={message}>{message}</p>
                ))}
            </form>
    );
};

export default Form;