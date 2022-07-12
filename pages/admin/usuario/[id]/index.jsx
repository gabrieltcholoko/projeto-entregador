import { useRouter } from "next/router";
import conectarDB from "../../../../lib/dbConnect";
import Usuario from "../../../../models/Usuario";
import Link from 'next/link';
import Header from "../../../../components/Header"

const UsuarioPage = ({ success, error, usuario }) => {
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
            await fetch(`/api/usuario/${id}`, {
                method: "DELETE",
            });
            router.push("/admin/listarusuario");
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
                            <h5 className="text-uppercase">{usuario.name}</h5>
                        </div>
                        <p className="fw-light">Cidade: {usuario.cidade}</p>
                        <p className="fw-light">E-mail: {usuario.email}</p>
                        <p className="fw-light">Telefone: {usuario.telefone}</p>

                        <Link href="/admin/listaremp">
                            <a className="btn btn-success btn-sm me-2">Voltar</a>
                        </Link>
                        <Link href={`/admin/usuario/${usuario._id}/edit`}>
                            <   a className="btn btn-warning btn-sm me-2">Editar</a>
                        </Link>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteData(usuario._id)}>Excluir</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsuarioPage;

export async function getServerSideProps({ params }) {
    try {
        await conectarDB()

        const usuario = await Usuario.findById(params.id).lean();

        if (!usuario) {
            return { props: { success: false, error: "Dados nao encontrados" } };
        }

        console.log(usuario);
        usuario._id = `${usuario._id}`;

        return { props: { success: true, usuario } };
    } catch (error) {
        console.log(error);
        if (error.kind === 'ObjectId') {
            return { props: { success: false, error: "ID nao Valido" } };
        }
        return { props: { success: false, error: "Erro de Servidor" } };
    }
}