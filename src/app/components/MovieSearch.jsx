"use client";

import { useState} from "react";

export default function MovieSearchCopy(){
  const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  const [tittle, setTittle] = useState(""); //guarda el texto que introduce el usuario
  const [movie, setMovie] = useState (null); //guarda la pelicula obtenida
  const [error, setError] = useState(null); //guarda el error si hay alguno
  const [loading, setLoading] = useState(false); //muestra mensaje de carga, se inicia en false es porque no carga al inicio

  const SearchMovie = async () => {
    //Funcion asincrona para hacer las llamadas a la API y obtener la respuesta
    // async permite usar await para llamadas a la API

    if (!tittle) return; //si el usuario no introduce nada, no hace nada
    setLoading(true); //muestra que se esta cargando
    setError(null); //si no introduce nada, muestra este mensaje

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${tittle}&apikey=${API_KEY}`
        //aqui se hace la llamada a la API con fetch, usando await para esperar la respuesta y se esta pidiendo el titulo de la pelicula
      );
      const data = await response.json(); //convertimos la respuesta en un objeto Js o Json

      if (data.response === "false"){
        setError (data.Error); //si el usuario introduce una pelicula que no existe, muestra el error
        setMovie(null); //limpia la pelicula
      }else{
        setMovie(data); //si todo va bien, guarda la pelicula en el estado movie
      }
    } catch (err){
      setError("Error"); //si hay un error muestra este mensaje
    } finally {
      setLoading(false); //esto se muestra haya error o no, para indicar que ha terminado la carga
    }
  };

  return (
    <div className="justify-center items-center flex flex-col h-screen "> 
    {/*flex es como una caja y flex-col coloca a todos los hijos en una columna uno bajo de otro*/}
      <h1 className="text-4xl">Buscador de peliculas</h1>
      <p className="p-4">Al escribir el titulo de la pelicula, se buscará en la API de OMDB y mostrara información sobre la pelicula</p>
      
      <div className="flex gap-2">
        <input
        className="text-black" 
        type="text"
        value={tittle} // El valor del input está controlado por el estado title
        onChange={e => setTittle (e.target.value)} // Actualiza el estado title cuando el usuario escribe en el input
        placeholder="Batman"
        />

        <button onClick={SearchMovie}> {/* Cuando el usuario hace click en el botón, se ejecuta la función SearchMovie*/}
          Buscar
        </button>
      </div>

      {loading && <p>Cargando...</p>} {/* Si loading es true, mostramos este texto */}
      {error && <p style={{ color: "red"}}>{error}</p>} {/* Si hay un error, lo mostramos en rojo */  }

      {movie &&(
        <div className="flex gap-6 p-8">
          {/* Solo se renderiza si movie NO es null */}

          <img
            src={movie.Poster}
            alt={movie.Title}
            width={200}
          />

          <div className="flex flex-col gap-2 pl-4 pt-20">
            <h3>{movie.Title}</h3>
            <p>Año: {movie.Year}</p>
            <p>Director: {movie.Director}</p>
            <p>Rating: {movie.imdbRating}</p>
          </div>
          {/* Mostramos el póster de la película */}
        </div>
      )}
    </div>
  )
}