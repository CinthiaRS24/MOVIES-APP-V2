import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import CardMovie from './CardMovie';

function Listado ({addOrRemoveFromFavs, favorites}) {
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
            <CardMovie movies={moviesList} addOrRemoveFromFavs={addOrRemoveFromFavs} favorites={favorites}/>
            }
                        
        </>
    )
}

export default Listado;