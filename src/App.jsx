import HomePage from "./pages/HomePage"
import DetailPage from "./pages/DetailPage"
import FavoritesPage from "./pages/FavoritesPage"
import Navbar from "./components/Navbar"
import { StrictMode, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import { useSelector } from "react-redux"

function App() {

  const favoriteMovies = useSelector((state) => state.favorites.movies);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div className="">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<DetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App
