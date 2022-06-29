import Form from "../components/Form"
import Nav from "../components/Nav"

const New = () => {

    const formData = {
        name: "",
        cidade: "",
        email: "",
        telefone: "",
    };

    return(
        <div className="container">
            <Nav/>
            <h1 className="my-3">Novo Contato</h1>
           <Form formData={formData}/>
        </div>
    );
}

export default New