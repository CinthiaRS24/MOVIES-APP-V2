import { Link } from "react-router-dom"

//Components
import Buscador from "./Buscador"

function Header ({addOrRemoveFromFavs}) {
    return (
        <header>
            <nav className="navbar navbar-expand navbar-dark bg-dark" >
                <div className="container">
                    <p className="titleApp">AlkeFlix</p>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link" id="titlesNav">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/listado" className="nav-link" id="titlesNav">Listado</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/favoritos" className="nav-link" id="titlesNav">Favoritos</Link>
                            </li>
                        </ul>
                    </div>
                    <Buscador />
                </div>
            </nav>
        </header>
    )
}

export default Header