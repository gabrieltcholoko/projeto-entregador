import Link from 'next/link';

const Header = () => {
    return (
        <div>
            <header className="p-3 bg-dark text-white">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link href="/"><a className="nav-link px-2 text-white">Home</a></Link></li>
                            <li><Link href="/listarcorretor"><a className="nav-link px-2 text-white">Listar Corretores</a></Link></li>
                            <li><Link href="/listaremp"><a className="nav-link px-2 text-white">Listar Imobiliarias</a></Link></li>
                            <li><Link href="/listarpostagem"><a className="nav-link px-2 text-white">Postagens</a></Link></li>
                            <li><Link href="/meusdados"><a className="nav-link px-2 text-white">Meus Dados</a></Link></li>
                        </ul>
                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" className="form-control form-control-dark text-white bg-dark" placeholder="Search..." aria-label="Search" />
                        </form>
                        <div className="text-end">
                            <Link href="/login/login/"><a className="btn btn-outline-light me-2">Login</a></Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;