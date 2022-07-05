import { Link } from "react-router-dom";


function CardMovie ({movies}) {

    console.log("movies", movies);

    return (
                
        <div className='row'>
            {
                movies.map((movie, index) => {
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
        </div>
            
        
    )

}

export default CardMovie;