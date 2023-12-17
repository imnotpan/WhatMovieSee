
import React, { useEffect, useState } from "react";


const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loadingMovies, setLoadingMovies] = useState(true);
    const moviePrefix = 'https://image.tmdb.org/t/p/w500 ';
    useEffect( () => {
        setLoadingMovies(true);
        fetch("https://api.themoviedb.org/3/discover/movie?language=es&page=1&sort_by=popularity.desc",
        {
            method: "GET",
            headers: {
                Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWQxNjU3MGNiZTNlMDZhMjM5ZjM0ZjQwYmVkMjcwMCIsInN1YiI6IjY1N2UzOTcyMzIzZWJhMTZjODg3YTllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g9Wqc42kiVWL_OuaHItV1wG-kwuhHcFfH_bLiYnS_Lo",
                Accept: "application/json",
            },
        })
            .then((response) => response.json() )
            .then((data) => {
                const fetchMovies = data.results.map( (movie: { title: string; overview: string; poster_path: string; }) => ({
                    title: movie.title,
                    overview: movie.overview,
                    poster_path: moviePrefix + movie.poster_path,
                }));
                setMovies(fetchMovies);
            })
            .catch((error) => console.error("Error fetching movies:", error))
            .finally( () =>{ 
                setLoadingMovies(false);
            });

    }, [])

    return { movies, loadingMovies};
} 
export default Movies;
