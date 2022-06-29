import Link from 'next/link';

const Nav = () => {
  return (
    <div className="nav">
      <ul>
        <li>
            <Link href="/"><a className="btn btn-secondary me-2">HOME</a></Link>
        </li>
        <li>
            <Link href="/listar"><a className="btn btn-secondary me-2">Listar Contato</a></Link>
        </li>
        <li>
            <Link href="/new"><a className="btn btn-secondary me-2">Inserir Contato</a></Link>
        </li>
        <li>
        <Link href="/login/"><a className="btn btn-secondary me-2">Login</a></Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;