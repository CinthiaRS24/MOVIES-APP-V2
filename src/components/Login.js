import axios from "axios";
import swal from '@sweetalert/with-react';
import { Navigate, useNavigate } from 'react-router-dom';
import "../css/app.css"


function Login() {
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(email === "" || password === "") {
            swal(
                <h2>Los campos no pueden estar vacíos</h2>
            )
            return;
        }

        if(email !== "" && !regexEmail.test(email)) {
            swal(
                <h2>Debes escribir una dirección de correo electrónico válida</h2>
            )
            return;
        }

        if (email !== "challenge@alkemy.org" || password !== "react") {
            swal(
                <h2>Credenciales inválidas</h2>
            )
            return;
        }

        axios
            .post('http://challenge-react.alkemy.org', { email, password })
            .then(res => {
                const tokenRecibido = res.data.token;
                sessionStorage.setItem('token', tokenRecibido);
                swal(
                    <h2>Perfecto, ingresaste correctamente</h2>
                );
                navigate("/listado");
            })
    }

    let token = sessionStorage.getItem('token');

    return (
        <div className="divLogin">
            {token && <Navigate to="/listado"/>}
            <div className="row">
                <h2>Formulario de Login</h2>
                <form onSubmit={submitHandler}>
                    <label className="form-label d-block mt-2">
                        <span>Correo electrónico:</span> <br/>
                        <input className="form-control" id="form-control" type="text" name="email"  />
                    </label>
                    <br/>
                    <label className="form-label d-block mt-2">
                        <span>Contraseña:</span> <br/>
                        <input className="form-control" id="form-control" type="password" name="password" />
                    </label>
                    <br/>
                    <button className="btn btn-success" type="submit" >Ingresar</button>
                </form>
            </div>
        </div>
    )
}

export default Login;