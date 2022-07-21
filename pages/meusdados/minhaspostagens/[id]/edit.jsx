import Form from "../../../../components/Postagem";
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


const EditPostagem = () => {
    const router = useRouter();
    const { id } = router.query;
  
    const { data: postagem, error } = useSWR(
      id ? `/api/postagem/${id}` : null,
      fetcher
    );
  
    if (error) {
      return <div>Error</div>;
    }
  
    if (!postagem) {
      return (
        <div className="container mt-5 text-center">
          <h1>Loading...</h1>
        </div>
      );
    }
  
    const formData = {
      titulo: postagem.titulo,
      descricao: postagem.descricao,
      valor: postagem.valor,
    };
  
    return (
      <div>
        <Header/>
      <div className="container">
        <h1>Editar Postagem</h1>
        <Form forNewPostagem={false} formData={formData}></Form>
      </div>
      </div>
    );
  };
  
  export default EditPostagem;
  