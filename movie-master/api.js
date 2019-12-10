// Initial Values
const MOVIE_DB_API = '192cb33f8d99845918e132ae97c45c09';
const MOVIE_DB_ENDPOINT = 'https://api.themoviedb.org';
const MOVIE_DB_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_POST_IMAGE = 'https://via.placeholder.com/150';

function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

function generateMovieDBUrl(path) {
    const url = `${MOVIE_DB_ENDPOINT}/3${path}?api_key=${MOVIE_DB_API}`;
    return url;
}

// Invoke a different function for search movies
function searchMovie(value) {
    var url = generateMovieDBUrl('/search/movie') + '&query=' + value;
    requestMovies(url, renderSearchMovies, handleGeneralError);


console.log(url)

    if (value.toLowerCase().includes('christmas')){
        console.log('right');
        console.log(value);
        document.getElementById("movies-searchable").style.display = "block";
    }else{
        console.log('none')
        console.log(value);
        document.getElementById("movies-searchable").style.display = "none";
    }
}


function getVideosByMovieId(movieId, content) {
    const url = generateMovieDBUrl(`/movie/${movieId}/videos`);
    const render = createVideoTemplate.bind({ content });
    requestMovies(url, render, handleGeneralError);
}