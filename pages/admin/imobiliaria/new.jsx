import Form from "../../../components/Form2"
import Header from "../../../components/Header"

const New = () => {

    const formData = {
        namejuridico: "",
        namefantasia: "",
        cnpj: "",
        cidade: "",
        email: "",
        telefone: "",
    };

    return (
        <div >
            <Header />
            <div className="container">
                <h1 className="my-3">Adicionar Nova Imoviliaria</h1>
                <Form formData={formData} />
            </div>

        </div>
    );
}

export default New