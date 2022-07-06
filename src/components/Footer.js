import github from "../images/github.png";
import gmail from "../images/gmail.png";
import linkedin from "../images/linkedin.png";
import "../css/app.css"

function Footer () {
    return(
        // <footer>
        //     <nav>
        //         <ul>
        //             <li><a href="http://instagram.com" rel="noopenernoreferrer">IG</a></li>
        //         </ul>
        //     </nav>
        //     <p>Copyright Cinthia's App</p>
        // </footer>
       
        <footer className="page-footer font-small indigo bg-dark" id="footer">
            <div className="divRedes">
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/cinthia-stephany-ramos-suyon/">
                    <img className="img-footer" src={linkedin}/>
                </a>
               
                <a target="_blank" rel="noreferrer" href="mailto:cinthia24027@gmail.com">
                    <img className="img-footer" src={gmail}/>
                </a>
               
                <a target="_blank" rel="noreferrer" href="https://github.com/CinthiaRS24">
                    <img className="img-footer" src={github}/>
                </a>
            </div>
            <div className="footer-copyright text-center text-light">
                <p className="copyright">© 2022 Copyright: Cinthia Ramos. Todos los derechos reservados.</p>
            </div>
        </footer>

    )
}

export default Footer;


