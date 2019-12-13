/* eslint-disable no-plusplus */
const endPoint = 'https://api.themoviedb.org/3/';
const apikey = '192cb33f8d99845918e132ae97c45c09';
let i = 0;
const api = `${endPoint}discover/movie?api_key=${apikey}&with_keywords=207317&page=`;

fetch(api)
  .then(res => res.json())
  .then(data => {
    // console.log(data);
    data.results.forEach(movie => {
      // console.log(movie.id);
      // kobler billede sti sammen med TMDB image endpoint
      const posterPath = movie.poster_path;
      const poster = `<img src="https://image.tmdb.org/t/p/w300/${posterPath}"></img>`;
      //= =====================================================================================
      //   laver en div til poster
      //= =====================================================================================
      const posterDiv = document.createElement('div');
      posterDiv.id = 'poster';
      posterDiv.innerHTML = poster;
      document.getElementById('posterSection').appendChild(posterDiv);
      // lytter efter clickevent på posterDiv og rydder samtidig indhold i movieinfo elementet
      posterDiv.addEventListener('click', function() {
        document.getElementById('movieInfo').innerHTML = ' ';
        //= =====================================================================================
        //   fetch til trailer
        //= =====================================================================================
        const getMovie = movie.id;
        const apiTwo = `${endPoint}movie/${getMovie}?api_key=${apikey}&append_to_response=videos`;
        fetch(apiTwo)
          .then(res => res.json())
          .then(dataTwo => {
            console.log(dataTwo);
            const trailerId = dataTwo.videos.results[0].key;
            const trailerDiv = document.createElement('div');
            trailerDiv.className = 'trailer';
            trailerDiv.innerHTML = `<iframe width="420" height="315"
              src="https://www.youtube.com/embed/${trailerId}">
              </iframe>`;
            document.getElementById('movieInfo').appendChild(trailerDiv);
            //= =====================================================================================
            //   laver en div til title
            //= =====================================================================================
            const getTitle = movie.title;
            const titleDiv = document.createElement('div');
            titleDiv.className = 'title';
            titleDiv.innerHTML = getTitle;
            document.getElementById('movieInfo').appendChild(titleDiv);
            //= =====================================================================================
            //   laver en div til description
            //= =====================================================================================
            const getDescription = movie.overview;
            const descriptionDiv = document.createElement('div');
            descriptionDiv.className = 'description';
            descriptionDiv.innerHTML = getDescription;
            document.getElementById('movieInfo').appendChild(descriptionDiv);
            //= =====================================================================================
            //   laver en div til year
            //= =====================================================================================
            const getYear = movie.release_date;
            const yearDiv = document.createElement('div');
            yearDiv.className = 'year';
            yearDiv.innerHTML = getYear;
            document.getElementById('movieInfo').appendChild(yearDiv);
          });
      });
      i++;
    });
  });
