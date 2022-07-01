import Link from 'next/link';

const Header = () => {
    return (
        <div>
            <header class="p-3 bg-dark text-white">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link href="/"><a className="nav-link px-2 text-secondary">Home</a></Link></li>
                            <li><Link href="/listar"><a className="nav-link px-2 text-white">Listar Contato</a></Link></li>
                            <li><Link href="/new"><a className="nav-link px-2 text-white">Inserir Contato</a></Link></li>
                        </ul>
                        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" class="form-control form-control-dark text-white bg-dark" placeholder="Search..." aria-label="Search" />
                        </form>
                        <div class="text-end">
                            <Link href="/login/"><a className="btn btn-outline-light me-2">Login</a></Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;