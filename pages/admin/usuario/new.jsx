import Form from "../../../components/Form"
import Header from "../../../components/Header"

const New = () => {

    const formData = {
        name: "",
        cidade: "",
        email: "",
        telefone: "",
    };

    return (
        <div >
            <Header />
            <div className="container">
                <h1 className="my-3">Adicionar Novo Usuario</h1>
                <Form formData={formData} />
            </div>

        </div>
    );
}

export default New