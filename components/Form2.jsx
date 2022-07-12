import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

const Form = ({formData, forNewImobiliaria = true}) => {

    const router = useRouter();

    const [form, setForm] = useState({
        namejuridico: formData.namejuridico,
        namefantasia: formData.namefantasia,
        cnpj: formData.cnpj,
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
        if(forNewImobiliaria){
            postData();
        }else{
            putData(form);
        } 
    };

    const putData = async (form) => {
        setMenssage([]);
        const {id} = router.query;
        try {
            const res = await fetch(`/api/imobiliaria/${id}`, {
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
                router.push("/admin/listaremp");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const postData = async () => {
        try {
            console.log(form);
                const res = await fetch("/api/imobiliaria", {
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
                    router.push("/admin/listaremp");
                }
        } catch (error) {
            console.log(error);
        }
    };


    return(
        <form onSubmit={handleSubmit}>
                <input className="form-control my-2" type="text" placeholder="Nome Juridico" autoComplete="off" name="namejuridico" required value={form.namejuridico} onChange={handleChange}/>
                <input className="form-control my-2" type="text" placeholder="Nome Fantasia" autoComplete="off" name="namefantasia" required value={form.namefantasia} onChange={handleChange}/>
                <input className="form-control my-2" type="text" placeholder="CNPJ" autoComplete="off" name="cnpj" required value={form.cnpj} onChange={handleChange}/>
                <input className="form-control my-2" type="text" placeholder="Cidade" autoComplete="off" name="cidade" required value={form.cidade} onChange={handleChange}/>
                <input className="form-control my-2" type="text" placeholder="E-mail" autoComplete="off" name="email" required value={form.email} onChange={handleChange}/>
                <input className="form-control my-2" type="text" placeholder="Telefone" autoComplete="off" name="telefone" required value={form.telefone} onChange={handleChange}/>
                <button className="btn btn-dark w-100" type="submit">{forNewImobiliaria ? "Enviar" : "Editar"}</button>
                <Link href="/admin/listaremp">
                    <a className="btn btn-dark w-100 my-2">Cancelar</a>
                </Link>
                {message.map(({ message }) => (
                    <p key={message}>{message}</p>
                ))}
            </form>
    );
};

export default Form;