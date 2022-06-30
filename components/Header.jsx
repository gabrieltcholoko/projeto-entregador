import Link from 'next/link';

const Header = () => {
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <div className='d-flex justify-content-start p-2'>
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 ">
                            <li><Link href="/"><a className="nav-link px-2 text-secondary">Home</a></Link></li>
                            <li><Link href="/listar"><a className="nav-link px-2 text-white">Listar Contato</a></Link></li>
                            <li><Link href="/new"><a className="nav-link px-2 text-white">Inserir Contato</a></Link></li>
                        </ul>
                    </div>
                    
                    <div className='d-flex justify-content-end ml-auto p-2'>
                        <div>
                            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                                <input type="search" className="form-control form-control-dark text-white bg-dark " placeholder="Search..." aria-label="Search" />
                            </form>
                        </div>
                        <div className="text-end ">
                            <Link href="/login/"><a className="btn btn-outline-light me-2">Login</a></Link>
                            <Link href="/"><a className="btn btn-warning">Sign-up</a></Link>
                        </div>
                    </div>

                </div>
            </div>
        </header>

    );
};

export default Header;