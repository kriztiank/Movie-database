let baseUrl = 'https://api.themoviedb.org/3/';
let apikey = 'cfbea9bfcd87f90b5271f8e73970e168';
// let key = '192cb33f8d99845918e132ae97c45c09';
let pagenumber = 1;

function getapi() {
  //= =====================================================================================
  //   api1 - Dannie - endpoint med christmas/holiday search viser alle posters.
  //= =====================================================================================
  let api1 = `${baseUrl}discover/movie?api_key=${apikey}&with_keywords=207317&page=${pagenumber}`;
  document.querySelector('.pagenumbertop').innerHTML = 'Page: ' + pagenumber;
  document.querySelector('.pagenumberbotton').innerHTML = 'Page: ' + pagenumber;
  fetch(api1)
    .then(res => res.json())

    .then(data => {
      console.log(data);
      data.results.forEach(movie => {
        // alt data fra api1 gemmes i et forEach loop og kan nu tilgås via et movie object "console.log(movie.id);"
        // kobler billede sti/movie.poster_path sammen med TMDB image endpoint https://image.tmdb.org/t/p/w300/
        let posterPath = movie.poster_path;
        let poster = `<img src="https://image.tmdb.org/t/p/w300/${posterPath}"></img>`;
        //= =====================================================================================
        //   Mikkel - laver divs til poster.
        //= =====================================================================================
        // output
        // laver en div
        let posterDiv = document.createElement('div');
        // tildeler den et id
        posterDiv.id = 'poster';
        // udskriver poster data i div tagget
        posterDiv.innerHTML = poster;
        // laver div som et child element til det html element som har et id'et posterSection
        document.getElementById('posterSection').appendChild(posterDiv);
        // lytter efter clickevent på posterDiv og åbner modal
        posterDiv.addEventListener('click', function() {
          document.querySelector('.modal-bg').style.display = 'flex';
          document.getElementById('title').innerHTML = ' ';
          document.getElementById('description').innerHTML = ' ';
          document.getElementById('trailer').innerHTML = ' ';
          document.getElementById('year').innerHTML = ' ';
          document.getElementById('runtime').innerHTML = ' ';
          document.getElementById('directors').innerHTML = ' ';
          document.getElementById('producers').innerHTML = ' ';
          document.getElementById('actors').innerHTML = ' ';

          //= =====================================================================================
          // api2 - addEventListener lytter på klik,
          // den tager den movie der bliver klikket på og kobler den på api2 med getMovie variablen.
          //= =====================================================================================

          //======================================================================================
          //   fetch til trialer
          //======================================================================================
          const getMovie = movie.id;
          const api2 = `${baseUrl}movie/${getMovie}?api_key=${apikey}&append_to_response=videos`;
          fetch(api2)
            .then(res => res.json())
            .then(data2 => {
              //= =====================================================================================
              //   laver en div til trailer.
              //= =====================================================================================
              // data
              const trailerId = data2.videos.results[0].key;
              const iframe = `<iframe width="400vh" height="300vh"
              src="https://www.youtube.com/embed/${trailerId}?rel=0" allowfullscreen=""></iframe>`;
              // output
              const outputTrailer = `<div class="trailer">${iframe}</div> `;
              document.getElementById('trailer').innerHTML = outputTrailer;
              //= =====================================================================================
              //   laver en h1 til title.
              //= =====================================================================================
              const outputTitle = `<h1 class="title">${movie.title}</h1>`;
              document.getElementById('title').innerHTML = outputTitle;
              //= =====================================================================================
              //   laver en p til description.
              //= =====================================================================================
              const outputDescription = `<p class="description">${movie.overview}</p>`;
              document.getElementById(
                'description'
              ).innerHTML = outputDescription;
              //= =====================================================================================
              //   laver en div til year.
              //= =====================================================================================
              const outputYear = `<p class="year"> <b>Release date:</b> ${movie.release_date}</p>`;
              document.getElementById('year').innerHTML = outputYear;
              //= =====================================================================================
              //   laver en div til runtime.
              //= =====================================================================================
              const outputRuntime = `<p class="runtime"><b>Runtime:</b> ${data2.runtime} minutes</p>`;
              document.getElementById('runtime').innerHTML = outputRuntime;
              //= =====================================================================================
              //  api3 - Kristian
              //  getPersons variablen tager den film der bliver klikket på og kobler den på,
              //  api3 som har en sti til cast og crew.
              //= =====================================================================================
            });

          const getPersons = movie.id;
          const api3 = `${baseUrl}movie/${getPersons}/credits?api_key=${apikey}`;
          fetch(api3)
            .then(res => res.json())
            .then(data3 => {
              const getDirectors = [];
              data3.crew.forEach(function(entry) {
                if (entry.job === 'Director') {
                  getDirectors.push(entry.name);
                  const outputDirectors = `<p class="directors"><b>Directors:</b> ${getDirectors.join(
                    ', '
                  )}</p> `;
                  document.getElementById(
                    'directors'
                  ).innerHTML = outputDirectors;
                }
              });
              const getProducers = [];
              data3.crew.forEach(function(entry) {
                if (entry.job === 'Producer') {
                  getProducers.push(entry.name);
                  const outputProducers = `<p class="producers"><b>Producers:</b> ${getProducers.join(
                    ', '
                  )}</p> `;
                  document.getElementById(
                    'producers'
                  ).innerHTML = outputProducers;
                }
              });
              const items = data3.cast; // data3.cast is the entrypoint api3
              // .map can get extract by key name, fx .name gets all the actor names, .character gets the role name
              const getCastMemberNames = items.map(
                castMember => castMember.name
              );
              const getFirstTwo = getCastMemberNames.slice(0, 2);
              // Create p element and class name
              const getActors = getFirstTwo;
              const outputActors = `<p class="actors"><b>Actors:</b> ${getActors.join(
                ', '
              )}</p> `;
              document.getElementById('actors').innerHTML = outputActors;
            });
          // klik event der lukker modal
          document
            .querySelector('.close')
            .addEventListener('click', function() {
              document.querySelector('.modal-bg').style.display = 'none';
            });
          // klik event der lukker modal hvis der klikkes udenfor
          const modal = document.querySelector('.modal-bg');

          function outsideClick(e) {
            if (e.target === modal) {
              modal.style.display = 'none';
            }
          }
          window.addEventListener('click', outsideClick);
        });
      });
    });
}
//======================================================================================
// mikkel - kalder fetch api
//======================================================================================
getapi();
//======================================================================================
// mikkel - sætter en eventlistener alle knapperne så man kan skiftte side
//======================================================================================
document.getElementById('pageDownTop').addEventListener('click', function() {
  if (pagenumber <= 1) {
  } else {
    pagenumber = pagenumber - 1;
    document.getElementById('posterSection').innerHTML = ' ';
    getapi();
  }
})
document.getElementById('pageUpTop').addEventListener('click', function() {
  if (pagenumber >= 66) {
  } else {
    pagenumber = pagenumber + 1;
    document.getElementById('posterSection').innerHTML = ' ';
    document.querySelector('.pagenumbertop').innerHTML = pagenumber;
    document.querySelector('.pagenumberbotton').innerHTML = pagenumber;
    getapi();
  }
})
document.getElementById('pageDownBotton').addEventListener('click', function() {
  if (pagenumber <= 1) {
  } else {
    pagenumber = pagenumber - 1;
    document.getElementById('posterSection').innerHTML = ' ';
    getapi();
  }
})
document.getElementById('pageUpBotton').addEventListener('click', function() {
  if (pagenumber >= 66) {
  } else {
    pagenumber = pagenumber + 1;
    document.getElementById('posterSection').innerHTML = ' ';
    document.querySelector('.pagenumbertop').innerHTML = pagenumber;
    document.querySelector('.pagenumberbotton').innerHTML = pagenumber;
    getapi();
  }
})