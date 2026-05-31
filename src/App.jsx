import HomePage from "./pages/HomePage"
import { StrictMode, useEffect } from "react"
import './App.css'
import { useSelector } from "react-redux"

function App() {

  const favoriteMovies = useSelector((state) => state.favorites.movies);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  return (
    <HomePage />
  )
}

export default App
