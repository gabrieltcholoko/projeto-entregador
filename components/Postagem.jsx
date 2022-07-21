import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

const Form = ({ formData, forNewPostagem = true }) => {

    const router = useRouter();

    const [form, setForm] = useState({
        titulo: formData.titulo,
        descricao: formData.descricao,
        valor: formData.valor,
    })

    const [message, setMenssage] = useState([]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (forNewPostagem) {
            postData();
        } else {
            putData(form);
        }
    };

    const putData = async (form) => {
        setMenssage([]);
        const { id } = router.query;
        try {
            const res = await fetch(`/api/postagem/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            console.log(data);

            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key]
                    setMenssage(oldmenssage => [
                        ...oldmenssage,
                        { message: error.message },
                    ]);
                }
            } else {
                setMenssage([]);
                router.push("/meusdados/minhaspostagens");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const postData = async () => {
        try {
            console.log(form);
            const res = await fetch("/api/postagem", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            console.log(data);

            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key]
                    setMenssage(oldmenssage => [
                        ...oldmenssage,
                        { message: error.message },
                    ]);
                }
            } else {
                router.push("/meusdados/minhaspostagens");
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <input className="form-control my-2" type="text" placeholder="Titulo" autoComplete="off" name="titulo" required value={form.titulo} onChange={handleChange} />
            <textarea className="form-control my-2" name="descricao" cols="50" type="text" placeholder="Descricao Anuncio" autoComplete="off" required value={form.descricao} onChange={handleChange}></textarea>
            <input className="form-control my-2" type="text" placeholder="Valor" autoComplete="off" name="valor" required value={form.valor} onChange={handleChange} />
            <button className="btn btn-dark w-100" type="submit">{forNewPostagem ? "Enviar" : "Editar"}</button>
            <Link href="/meusdados/minhaspostagens">
                <a className="btn btn-dark w-100 my-2">Cancelar</a>
            </Link>
            {message.map(({ message }) => (
                <p key={message}>{message}</p>
            ))}
        </form>
    );
};

export default Form;