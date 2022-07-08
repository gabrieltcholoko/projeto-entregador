import Form from "../../../components/Form1"
import Header from "../../../components/Header"

const New = () => {

    const formData = {
        name: "",
        creci: "",
        cidade: "",
        email: "",
        telefone: "",
    };

    return (
        <div >
            <Header />
            <div className="container">
                <h1 className="my-3">Adicionar Novo Corretor</h1>
                <Form formData={formData} />
            </div>

        </div>
    );
}

export default New