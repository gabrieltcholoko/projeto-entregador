import Head from 'next/head'
import Link from 'next/link';

import conectarDB from '../lib/dbConnect'
import Movie from '../models/Movie'
import Nav from "../components/Nav"

export default function Listar({movies}) {
  return (
    <div>
      <Head>
        <title>Lista de Contatos</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
      <Nav />
        <h1>Contatos!</h1>
        <Link href="/"><a className="btn btn-secondary w-100 mb-2">Index</a></Link>
        <Link href="/new"><a className="btn btn-secondary w-100 mb-2">Inserir Contato</a></Link>
        {
          movies.map(({_id, name}) => (
            <div className="card mb-2"key={_id}>
              <div className="card-body">
                <div className="h5 text-uppercase">{name}</div>
                  <Link href={`/${_id}`}>
                    <a className="btn btn-success btn-sm">+Info</a>
                  </Link>
              </div>
            </div>
          ))
        }
      </main>
    </div>
  )
}

export async function getServerSideProps(){
  try {
      await conectarDB()
      
      const res = await Movie.find({});

      const movies = res.map(doc =>{
          const movie = doc.toObject();
          movie._id = `${movie._id}`;
          return movie;
      })
      
      return {props: {movies}};
  } catch (error) {
    console.log(error);
  }
}