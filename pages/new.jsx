import Form from "../components/Form"

const New = () => {

    const formData = {
        name: "",
        cidade: "",
        email: "",
        telefone: "",
    };

    return(
        <div className="container">
            <h1 className="my-3">Novo Contato</h1>
           <Form formData={formData}/>
        </div>
    );
}

export default New