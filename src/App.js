// Libraries
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";

// Styles
import './css/bootstrap.min.css'
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";

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
      console.log("Se agregó la película")
    } else {
      let moviesLeft = tempMoviesInFavs.filter(movie => {
        return movie.id !== movieData.id;
      })
      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      setFavorites(moviesLeft)
      console.log("Se eliminó la película");
    }

  }

  return (
    <>
      <Header/>
      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/listado" element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs} favorites={favorites}/>}/>
          <Route path="/detalle" element={<Detalle/>}/>
          <Route path="/favoritos" element={<Favoritos addOrRemoveFromFavs={addOrRemoveFromFavs} favorites={favorites}/>}/>
          <Route path="/resultados" element={<Resultados/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
