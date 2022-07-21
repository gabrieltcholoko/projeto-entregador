import { useRouter } from "next/router";
import conectarDB from "../../../../lib/dbConnect";
import Corretor from "../../../../models/Corretor";
import Link from 'next/link';
import Header from "../../../../components/Header"

const CorretorPage = ({ success, error, corretor }) => {
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

    return (
        <div>
            <Header />
            <div className="container">
                <h1>Meus Dados</h1>
                <div className="card">
                    <div className="card-body">
                        <div className="card_title">
                            <h5 className="text-uppercase">{corretor.name}</h5>
                        </div>
                        <p className="fw-light">Nome: {corretor.name}</p>
                        <p className="fw-light">CRECI: {corretor.creci}</p>
                        <p className="fw-light">Cidade: {corretor.cidade}</p>
                        <p className="fw-light">E-mail: {corretor.email}</p>
                        <p className="fw-light">Telefone: {corretor.telefone}</p>

                        <Link href={`/admin/corretor/${corretor._id}/edit`}>
                            <   a className="btn btn-dark btn-sm me-2">Editar Informacoes</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CorretorPage;

export async function getServerSideProps({ params }) {
    try {
        await conectarDB()

        const corretor = await Corretor.findById(params.id).lean();

        if (!corretor) {
            return { props: { success: false, error: "Dados nao encontrados" } };
        }

        console.log(corretor);
        corretor._id = `${corretor._id}`;

        return { props: { success: true, corretor } };
    } catch (error) {
        console.log(error);
        if (error.kind === 'ObjectId') {
            return { props: { success: false, error: "ID nao Valido" } };
        }
        return { props: { success: false, error: "Erro de Servidor" } };
    }
}