let key = '192cb33f8d99845918e132ae97c45c09';
let endPoint = 'https://api.themoviedb.org/3/';
const api = `${endPoint}discover/movie?api_key=${key}&with_keywords=207317&page=`

fetch(api)
.then(res => res.json())
.then(data => { 

console.log(data);

let desc = data.results[0].title;
document.getElementById("text-string").innerHTML = desc;

let posterPath = data.results[0].poster_path;
document.getElementById("poster").innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${posterPath}"></img>`;

movieNbr = data.results[0].id;

const apiTwo = `${endPoint}movie/${movieNbr}?api_key=${key}&append_to_response=videos`;


    fetch(apiTwo)
    .then(res => res.json())
    .then(data => { 

    console.log(data)

    let runTime = data.runtime;
    document.getElementById("runtime").innerHTML = runTime;

let vidId = data.videos.results[0].key;
console.log(vidId);

let section = document.getElementById("sec");
section.insertAdjacentHTML(
  "beforeend",
  `<iframe width="420" height="315"
  src="https://www.youtube.com/embed/${vidId}">
  </iframe>`);

    });
});