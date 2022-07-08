import Form from "../../../../components/Form2";
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
  
    const { data: imobiliaria, error } = useSWR(
      id ? `/api/imobiliaria/${id}` : null,
      fetcher
    );
  
    if (error) {
      return <div>Error</div>;
    }
  
    if (!imobiliaria) {
      return (
        <div className="container mt-5 text-center">
          <h1>Loading...</h1>
        </div>
      );
    }
  
    const formData = {
      namejuridico: imobiliaria.namejuridico,
      namefantasia: imobiliaria.namefantasia,
      cnpj: imobiliaria.cnpj,
      cidade: imobiliaria.cidade,
      email: imobiliaria.email,
      telefone: imobiliaria.telefone, 
    };
  
    return (
      <div>
        <Header/>
      <div className="container">
        <h1>Editar Imobiliaria</h1>
        <Form forNewImobiliaria={false} formData={formData}></Form>
      </div>
      </div>
    );
  };
  
  export default EditMovie;
  