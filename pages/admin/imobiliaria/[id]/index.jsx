import { useRouter } from "next/router";
import conectarDB from "../../../../lib/dbConnect";
import Imobiliaria from "../../../../models/Imobiliaria";
import Link from 'next/link';
import Header from "../../../../components/Header"

const ImobiliariaPage = ({ success, error, imobiliaria }) => {
    const router = useRouter();

    if (!success) {
        return (
            <div className="container text-center my-5">
                <h1>{error}</h1>

                <Link href="/">
                    <a className="btn btn-success">Voltar</a>
                </Link>
            </div>
        );
    }

    const deleteData = async (id) => {
        try {
            await fetch(`/api/imobiliaria/${id}`, {
                method: "DELETE",
            });
            router.push("/admin/listaremp");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Header />
            <div className="container">
                <h1>Dados da Imobiliaria</h1>
                <div className="card">
                    <div className="card-body">
                        <div className="card_title">
                            <h5 className="text-uppercase">{imobiliaria.namejuridico}</h5>
                        </div>
                        <p className="fw-light">Nome Juridico: {imobiliaria.namejuridico}</p>
                        <p className="fw-light">Nome Fantasia: {imobiliaria.namefantasia}</p>
                        <p className="fw-light">CNPJ: {imobiliaria.cnpj}</p>
                        <p className="fw-light">Cidade: {imobiliaria.cidade}</p>
                        <p className="fw-light">E-mail: {imobiliaria.email}</p>
                        <p className="fw-light">Telefone: {imobiliaria.telefone}</p>

                        <Link href="/admin/listaremp">
                            <a className="btn btn-success btn-sm me-2">Voltar</a>
                        </Link>
                        <Link href={`/admin/imobiliaria/${imobiliaria._id}/edit`}>
                            <   a className="btn btn-warning btn-sm me-2">Editar</a>
                        </Link>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteData(imobiliaria._id)}>Excluir</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImobiliariaPage;

export async function getServerSideProps({ params }) {
    try {
        await conectarDB()

        const imobiliaria = await Imobiliaria.findById(params.id).lean();

        if (!imobiliaria) {
            return { props: { success: false, error: "Dados nao encontrados" } };
        }

        console.log(imobiliaria);
        imobiliaria._id = `${imobiliaria._id}`;

        return { props: { success: true, imobiliaria } };
    } catch (error) {
        console.log(error);
        if (error.kind === 'ObjectId') {
            return { props: { success: false, error: "ID nao Valido" } };
        }
        return { props: { success: false, error: "Erro de Servidor" } };
    }
}