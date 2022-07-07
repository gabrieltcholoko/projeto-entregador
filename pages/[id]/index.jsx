import { useRouter } from "next/router";
import conectarDB from "../../lib/dbConnect";
import Movie from "../../models/Movie";
import Link from 'next/link';
import Header from "../../components/Header"

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

    return (
        <div>
            <Header />
            <div className="container">
                <h1>Contato</h1>
                <div className="card">
                    <div className="card-body">
                        <div className="card_title">
                            <h5 className="text-uppercase">{movie.name}</h5>
                        </div>
                        <p className="fw-light">Cidade: {movie.cidade}</p>
                        <p className="fw-light">E-mail: {movie.email}</p>
                        <p className="fw-light">Telefone: {movie.telefone}</p>
                        <div className='row'>
                            <div className="col-4 p-3 centered ">
                                <Link href="/listar">
                                
                                    <a className="btn btn-secondary w-100 mb-2 ">Voltar</a>
                                </Link>
                            </div>
                        </div>
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