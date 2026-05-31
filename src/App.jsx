import HomePage from "./pages/HomePage"
import DetailPage from "./pages/DetailPage"
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
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/movie/:id" element={<DetailPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
