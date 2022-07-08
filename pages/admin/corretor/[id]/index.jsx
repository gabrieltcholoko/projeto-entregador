import { useRouter } from "next/router";
import conectarDB from "../../../../lib/dbConnect";
import Movie from "../../../../models/Movie";
import Link from 'next/link';
import Header from "../../../../components/Header"

const MoviePage = ({ success, error, movie }) => {
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
            await fetch(`/api/movie/${id}`, {
                method: "DELETE",
            });
            router.push("/admin/listarcorretor");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Header />
            <div className="container">
                <h1>Dados do Usuario</h1>
                <div className="card">
                    <div className="card-body">
                        <div className="card_title">
                            <h5 className="text-uppercase">{movie.name}</h5>
                        </div>
                        <p className="fw-light">Cidade: {movie.cidade}</p>
                        <p className="fw-light">E-mail: {movie.email}</p>
                        <p className="fw-light">Telefone: {movie.telefone}</p>

                        <Link href="/admin/listarcorretor">
                            <a className="btn btn-success btn-sm me-2">Voltar</a>
                        </Link>
                        <Link href={`/admin/corretor/${movie._id}/edit`}>
                            <   a className="btn btn-warning btn-sm me-2">Editar</a>
                        </Link>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteData(movie._id)}>Excluir</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviePage;

export async function getServerSideProps({ params }) {
    try {
        await conectarDB()

        const movie = await Movie.findById(params.id).lean();

        if (!movie) {
            return { props: { success: false, error: "Dados nao encontrados" } };
        }

        console.log(movie);
        movie._id = `${movie._id}`;

        return { props: { success: true, movie } };
    } catch (error) {
        console.log(error);
        if (error.kind === 'ObjectId') {
            return { props: { success: false, error: "ID nao Valido" } };
        }
        return { props: { success: false, error: "Erro de Servidor" } };
    }
}