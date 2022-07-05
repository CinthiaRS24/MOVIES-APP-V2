import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import CardMovie from './CardMovie';

function Listado () {
    let token = sessionStorage.getItem('token');

    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=e5cf865c22fdc4d73f95698368555db2&language=es-ES&page=1'
        axios
            .get(endPoint)
            .then(r => {
                const apiData = r.data;
                setMoviesList(apiData.results);
            })
            .catch(error => {
                swal(
                    <h2>Hubo errores, intenta más tarde</h2>
                )
            })
    }, [setMoviesList])
    console.log("moviesList", moviesList);
    

    return(
        <>
            {!token && <Navigate to="/"/>}

            {moviesList && 
            <CardMovie movies={moviesList}/>
            }
            
            
            {/* <div className='row'>
                {
                    moviesList.map((movie, index) => {
                        return (
                            <div className="col-3" key={index}>
                                <div className="card my-4">
                                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title.substring(0, 30)}...</h5>
                                        <p className="card-text">{movie.overview.substring(0, 100)}...</p>
                                        <Link to={`/detalle?movieID=${movie.id}`} className="btn btn-primary">View detail</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    
                    })
                }
            </div> */}
            
        </>
    )
}

export default Listado;