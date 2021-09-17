const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=36213a2163c7dbc6ad1ceabef8e337cc&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=36213a2163c7dbc6ad1ceabef8e337cc&query="';

const main = document.getElementById("main")
const form = document.getElementById("form");
const search = document.getElementById("search");
getMovies(API_URL);
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results)
}
function showMovies (movies) {
    main.innerHTML =""
    
    movies.forEach((movie) => {
        const { title, poster_path, overview, vote_average} = movie
        const el = document.createElement("div")
        el.classList.add("movie")
        el.innerHTML = `
        <img
          src="${IMG_PATH + poster_path}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${setColorByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>`;
        main.appendChild(el)
    })
}
function setColorByRate(rate) {
    if (rate >= 8.5){
        return "green"
    }
    else if (rate > 5) {
        return "orange"
    }
    else {
        return "red"
    }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (search.value) {
    getMovies(SEARCH_URL + search.value);
    search.value = "";
  } else {
      window.location.reload()
  }
});
