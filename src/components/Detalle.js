import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from '@sweetalert/with-react';

function Detalle () {
    let token = sessionStorage.getItem('token');

    let query = new URLSearchParams(window.location.search);
    let movieID = query.get('movieID');

    const [movie, setMovie] = useState(null);
    console.log("moviee", movie)

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=e5cf865c22fdc4d73f95698368555db2&language=es-ES`
        axios
            .get(endPoint)
            .then(response => {
                const movieData = response.data;
                setMovie(movieData);
            })
            .catch(error => {
                console.log(error);
                swal(
                    <h2>Película no encontrada</h2>
                );
            })
    }, [movieID])

    

    return (
        <>
            {!token && <Navigate to="/"/>}
            {!movie && <p>Cargando...</p>}
            {movie && 
                <>
                    <h2>Título: {movie.title}</h2>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="movie poster"/>
                        </div>
                        <div className='col-8'>
                            <h5>Fecha de estreno: {movie.release_date}</h5>
                            <h5>Reseña:</h5>
                            <p>{movie.overview}</p>
                            <h5>Raiting: {movie.vote_average}</h5>
                            <h5>Géneros:</h5>
                            <ul>
                                {movie.genres.map(genre => {
                                    return <li key={genre.id}>{genre.name}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
export default Detalle;