const API_KEY = "23f37bdfb10eb77c87a156e5e5939f9a";

const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");
const moviesContainer = document.getElementById("moviesContainer");
const loading = document.getElementById("loading");

/* Search Button */

searchBtn.addEventListener("click", () => {

  const movieName = movieInput.value.trim();

  if(movieName !== ""){
    searchMovies(movieName);
  }

});

/* Enter Key Search */

movieInput.addEventListener("keypress", (e) => {

  if(e.key === "Enter"){
    searchBtn.click();
  }

});

/* Fetch Movies */

async function searchMovies(movie){

  loading.classList.remove("hidden");

  moviesContainer.innerHTML = "";

  try{

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movie)}`
    );

    const data = await response.json();

    loading.classList.add("hidden");

    console.log(data);

    if(data.results && data.results.length > 0){

      displayMovies(data.results);

    }else{

      moviesContainer.innerHTML =
      `<h2>No movies found</h2>`;

    }

  }catch(error){

    loading.classList.add("hidden");

    moviesContainer.innerHTML =
    `<h2>Error fetching movies</h2>`;

    console.log(error);

  }

}

/* Display Movies */

function displayMovies(movies){

  moviesContainer.innerHTML = "";

  movies.forEach(movie => {

    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : `https://via.placeholder.com/300x450`;

    moviesContainer.innerHTML += `

      <div class="movie-card">

        <img src="${poster}" alt="${movie.title}">

        <div class="movie-info">

          <h3>${movie.title}</h3>

          <p>⭐ Rating: ${movie.vote_average}</p>

          <p>📅 Release: ${movie.release_date}</p>

          <p>🌍 Language: ${movie.original_language.toUpperCase()}</p>

        </div>

      </div>

    `;

  });

}