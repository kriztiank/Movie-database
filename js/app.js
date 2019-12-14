const baseUrl = 'https://api.themoviedb.org/3/';
const apikey = '192cb33f8d99845918e132ae97c45c09';
const api1 = `${baseUrl}discover/movie?api_key=${apikey}&with_keywords=207317&page=`;

// api1 endpoint with christmas/holiday search
fetch(api1)
  .then(res => res.json())
  .then(data1 => {
    // console.log(data1);
    data1.results.forEach(movie => {
      // alt data fra baseUrl og api1 gemmes i et forEach loop og kan nu hentes via et movie object "console.log(movie.id);"
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
      // lytter efter clickevent på posterDiv og rydder samtidig indhold i movieInfo elementet
      posterDiv.addEventListener('click', function() {
        document.getElementById('movieInfo').innerHTML = ' ';
        //= =====================================================================================
        // api2 - addEventListener lytter på klik og tager den movie der bliver klikket på og kobler den på api2 &append_to_response=videos
        //= =====================================================================================
        const getMovie = movie.id;
        const api2 = `${baseUrl}movie/${getMovie}?api_key=${apikey}&append_to_response=videos`;

        fetch(api2)
          .then(res => res.json())
          .then(data2 => {
            // console.log(data2);
            const trailerId = data2.videos.results[0].key;
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
            //= =====================================================================================
            //   laver en div til runtime
            //= =====================================================================================
            const getRuntime = data2.runtime;
            const runtimeDiv = document.createElement('div');
            runtimeDiv.className = 'runtime';
            runtimeDiv.innerHTML = getRuntime;
            document.getElementById('movieInfo').appendChild(runtimeDiv);
          });
        // api3
        const getPersons = movie.id;
        const api3 = `${baseUrl}movie/${getPersons}/credits?api_key=${apikey}`;
        // console.log(api3);
        fetch(api3)
          .then(res => res.json())
          .then(data3 => {
            // console.log(data3);
            const getDirectors = [];
            data3.crew.forEach(function(entry) {
              if (entry.job === 'Director') {
                getDirectors.push(entry.name);

                const directorsDiv = document.createElement('div');
                directorsDiv.className = 'directors';
                directorsDiv.innerHTML = getDirectors;
                document.getElementById('movieInfo').appendChild(directorsDiv);
                // console.log(getDirectors);
                // console.log(`Director: ${directors.join(', ')}`);
              }
            });

            const getProducers = [];
            data3.crew.forEach(function(entry) {
              if (entry.job === 'Producer') {
                getProducers.push(entry.name);

                const producersDiv = document.createElement('div');
                producersDiv.className = 'producers';
                producersDiv.innerHTML = getProducers;
                document.getElementById('movieInfo').appendChild(producersDiv);
                // console.log(getProducers);
                // console.log(`Producer: ${getProducers.join(', ')}`);
              }
            });
            const items = data3.cast; // data3.cast is the entrypoint api3

            // .map can get extract by key name, fx .name gets all the actor names, .character gets the role name
            const getCastMemberNames = items.map(castMember => castMember.name);
            const getFirstTwo = getCastMemberNames.slice(0, 2);
            // Create element and class name
            const getActors = getFirstTwo;
            const actorsDiv = document.createElement('div');
            actorsDiv.className = 'actors';
            actorsDiv.innerHTML = getActors;
            document.getElementById('movieInfo').appendChild(actorsDiv);
          });
      });
    });
  });
