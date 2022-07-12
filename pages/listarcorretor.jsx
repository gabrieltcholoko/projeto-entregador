import Head from 'next/head'
import Link from 'next/link';

import conectarDB from '../lib/dbConnect'
import Movie from '../models/Corretor'
import Header from "../components/Header"

export default function Listar({ movies }) {
  return (
    <div>
      <Head>
        <title>Lista de Corretores</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
      </div>
      <main className="container">
        <div className='p-4'></div>
        <div className='centered col-md-6'>
          <h1>Lista de Corretores</h1>
        </div>
        

        <div className="d-flex p-2">
          <div className="d-flex">
            {
              movies.map(({ _id, name }) => (
                <div className="" key={_id}>
                  <div className="justify-content-center m-3">
                    <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777" /><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
                    <h2 className="fw-normal text-center">{name}</h2>
                    <div className="text-center">
                      <Link href={`/${_id}`}>
                        <a className="btn btn-success btn-sm">+Info</a>
                      </Link>
                    </div>

                  </div>
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

    const res = await Movie.find({});

    const movies = res.map(doc => {
      const movie = doc.toObject();
      movie._id = `${movie._id}`;
      return movie;
    })

    return { props: { movies } };
  } catch (error) {
    console.log(error);
  }
}