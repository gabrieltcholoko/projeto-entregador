import Form from "../../../../components/Form";
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


const EditUsuario = () => {
    const router = useRouter();
    const { id } = router.query;
  
    const { data: usuario, error } = useSWR(
      id ? `/api/usuario/${id}` : null,
      fetcher
    );
  
    if (error) {
      return <div>Error</div>;
    }
  
    if (!usuario) {
      return (
        <div className="container mt-5 text-center">
          <h1>Loading...</h1>
        </div>
      );
    }
  
    const formData = {
      name: usuario.name,
      cidade: usuario.cidade,
      email: usuario.email,
      telefone: usuario.telefone, 
    };
  
    return (
      <div>
        <Header/>
      <div className="container">
        <h1>Editar Usuario</h1>
        <Form forNewUsuario={false} formData={formData}></Form>
      </div>
      </div>
    );
  };
  
  export default EditUsuario;
  