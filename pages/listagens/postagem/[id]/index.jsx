import { useRouter } from "next/router";
import conectarDB from "../../../../lib/dbConnect";
import Postagem from "../../../../models/Postagem";
import Link from 'next/link';
import Header from "../../../../components/Header"

const PostagemPage = ({ success, error, postagem }) => {
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
            await fetch(`/api/postagem/${id}`, {
                method: "DELETE",
            });
            router.push("/admin/listarpostagem");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Header />
            <div className="container">
                <h1>Dados da Usuario</h1>
                <div className="card">
                    <div className="card-body">
                    <div className="card_title">
                            <h5 className="text-uppercase">Titulo: {postagem.titulo}</h5>
                        </div>
                        <p className="fw-light">Descricao: {postagem.descricao}</p>
                        <p className="fw-light">Valor: {postagem.valor}</p>

                        <Link href="/listarpostagem">
                            <a className="btn btn-success btn-sm me-2">Voltar</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostagemPage;

export async function getServerSideProps({ params }) {
    try {
        await conectarDB()

        const postagem = await Postagem.findById(params.id).lean();

        if (!postagem) {
            return { props: { success: false, error: "Dados nao encontrados" } };
        }

        console.log(postagem);
        postagem._id = `${postagem._id}`;

        return { props: { success: true, postagem } };
    } catch (error) {
        console.log(error);
        if (error.kind === 'ObjectId') {
            return { props: { success: false, error: "ID nao Valido" } };
        }
        return { props: { success: false, error: "Erro de Servidor" } };
    }
}