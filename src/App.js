// Libraries
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";

// Styles
import './css/bootstrap.min.css'
import swal from '@sweetalert/with-react';

function App() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
      const favsLocal = localStorage.getItem('favs');

      if(favsLocal !== null) {
          const favsArray = JSON.parse(favsLocal)
          setFavorites(favsArray);
      }
  }, [])

  const addOrRemoveFromFavs = (e) => {

    const favMovies = localStorage.getItem('favs');

    let tempMoviesInFavs;
  
    if(favMovies === null) {
      tempMoviesInFavs = [];
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }
  
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieData = {
      imgURL, title, overview,
      id: btn.dataset.movieId
    }
    
    let movieIsInArray = tempMoviesInFavs.find(movie => {
      return movie.id === movieData.id;
    });

    if(!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs)
      swal(
        "Película agregada a favoritos", "", "success"
      )
    } else {
      let moviesLeft = tempMoviesInFavs.filter(movie => {
        return movie.id !== movieData.id;
      })
      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      setFavorites(moviesLeft)
      swal(
        "Se eliminó la película de favoritos", "", "success"
      )
    }

  }

  return (
    <>
      <Header />
      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/listado" element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs}/>}/>
          <Route path="/detalle" element={<Detalle/>}/>
          <Route path="/favoritos" element={<Favoritos addOrRemoveFromFavs={addOrRemoveFromFavs} favorites={favorites}/>}/>
          <Route path="/resultados" element={<Resultados addOrRemoveFromFavs={addOrRemoveFromFavs}/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
