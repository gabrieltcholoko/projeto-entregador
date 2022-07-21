import Head from 'next/head'
import Link from 'next/link';

import conectarDB from '../../lib/dbConnect'
import Postagem from '../../models/Postagem'
import Header from "../../components/Header"

export default function Listar({ postagens }) {
  return (
    <div>
      <Head>
        <title>Lista de Usuarios</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
      </div>
      <main className="container">
        <div className="d-flex p-2 ">
          <div className="d-flex flex-column centered">{

            postagens.map(({ _id, titulo }) => (
              <div className="" key={_id}>
                <Link href={`/admin/postagem/${_id}`}><a className='a'>
                  <div className="justify-content-center m-3">
                    <svg className="bd-placeholder-img imagem" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777" /><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
                    <h2 className="fw-normal text-center cor2">{titulo}</h2>
                    <div className="text-center">
                    </div>
                  </div>
                </a>
                </Link>
              </div>
            ))
          }
          </div>
        </div>


      </main>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    await conectarDB()

    const res = await Postagem.find({});

    const postagens = res.map(doc => {
      const postagem = doc.toObject();
      postagem._id = `${postagem._id}`;
      return postagem;
    })

    return { props: { postagens } };
  } catch (error) {
    console.log(error);
  }
}