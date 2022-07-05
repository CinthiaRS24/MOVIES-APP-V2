import { useEffect, useState } from "react";
import CardMovie from "./CardMovie";
import axios from "axios";
import swal from '@sweetalert/with-react';

function Resultados () {
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');

    const [moviesResults, setMoviesResults] = useState([]);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=e5cf865c22fdc4d73f95698368555db2&language=en-US&query=${keyword}`;
        axios
            .get(endPoint)
            .then(r => {
                const moviesArray = r.data.results;

                if(moviesArray.length === 0) {
                    swal(
                        <h4>Tu búsqueda no arrojó resultados</h4>
                    )
                }

                setMoviesResults(moviesArray);
            })
            .catch(error => {
                swal(
                    <h2>Hubo errores, intenta más tarde</h2>
                )
            })
    }, [keyword])

    return(
        <>
            <h2>Buscaste: <i>{keyword}</i></h2>

            {moviesResults.length === 0 &&
                <h3>No hay resultados</h3>
            }

            {moviesResults && 
                <CardMovie movies={moviesResults}/>
            }
        </>
        
    )
}

export default Resultados;