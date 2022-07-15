import Form from "../../../components/Form3"
import Header from "../../../components/Header"

const New = () => {

    const formData = {
        email: "",
        password: "",
    };

    return (
        <div >
            <Header />
            <div className="container">
                <h1 className="my-3">Cadastro de Usuario</h1>
                <Form formData={formData} />
            </div>

        </div>
    );
}

export default New