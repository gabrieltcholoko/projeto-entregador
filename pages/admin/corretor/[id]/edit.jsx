import Form from "../../../../components/Form1";
import useSWR from "swr";
import { useRouter } from "next/dist/client/router";
import Header from "../../../../components/Header";

const fetcher = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        const error = new Error("An error occurred while fetching the data.");
        error.info = await res.json();
        error.status = res.status;
        throw error;
      }
    const {data} = await res.json();

    return data;
};


const EditMovie = () => {
    const router = useRouter();
    const { id } = router.query;
  
    const { data: movie, error } = useSWR(
      id ? `/api/movie/${id}` : null,
      fetcher
    );
  
    if (error) {
      return <div>Error</div>;
    }
  
    if (!movie) {
      return (
        <div className="container mt-5 text-center">
          <h1>Loading...</h1>
        </div>
      );
    }
  
    const formData = {
      name: movie.name,
      cidade: movie.cidade,
      email: movie.email,
      telefone: movie.telefone, 
    };
  
    return (
      <div>
        <Header/>
      <div className="container">
        <h1>Editar Corretor</h1>
        <Form forNewMovie={false} formData={formData}></Form>
      </div>
      </div>
    );
  };
  
  export default EditMovie;
  