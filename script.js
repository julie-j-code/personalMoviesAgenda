const calendar = new VanillaCalendar({
  selector: "#myCalendar",
  months: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  shortWeekday: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  onSelect: (data, elem) => {
    console.log(data);
    console.log(elem);
    // la data récupérée étant un objet avec une propriété date
    selectedDate = new Date(data.date).toISOString().split("T")[0];
    alert(`Vous avez sélectionné le ${selectedDate}`);
    // pour afficher les films sauvegardés pour la date sélectionnée
    displayMovie(new Date(data.date).toISOString());

  },
});

const movieList = document.querySelector("#movie-list");
// soumission du  formulaire
const movieForm = document.querySelector("#movie-form");
movieForm.addEventListener("submit", addMovie);


function addMovie(e) {
  e.preventDefault();
  const formData = new FormData(movieForm);
  console.log(formData);
  const title = formData.get("title");
  const year = formData.get("year");
  const duration = formData.get("duration");
  // const genres = formData.get("genres");
  const genres = formData.getAll("genres");
  // console.log(title, year, duration, genres);
  const newMovie = {
    title,
    year: Number(year),
    duration,
    genres,
    date: selectedDate,
  };
  console.log(newMovie);
  saveMovie(newMovie);
  movieForm.reset();
}

// pour sauvegarder dans localStorage

function saveMovie(movie) {
  let movies = JSON.parse(localStorage.getItem("movies")) || [];
  movies = [...movies, movie];
  localStorage.setItem("movies", JSON.stringify(movies));
}

// afficher les films enregistrés
function displayMovie(date) {
  let movies = JSON.parse(localStorage.getItem("movies")) || [];
  console.log(movies);
  const moviesAtThisDate = movies.filter((movie) => {
    // console.log("date", date.split("T")[0]);
    // console.log("movie-date", movie.date);
    return movie.date === date.split("T")[0];
  });

  console.log("resultat", moviesAtThisDate);

  if (moviesAtThisDate.length === 1) {
    const movie = moviesAtThisDate[0];
    // let movieList = document.querySelector("#movie-list");
    movieList.innerHTML = `
      <div class="movie-item">
      <h3>${movie.title}</h3>
      <span>année : ${movie.year}</span>                                                                                                                                                                                              
      <span>durée : ${movie.duration}</span>
      <span>genre : ${movie.genres}</span>
      </div>
      `;
  } else if (moviesAtThisDate.length > 1) {
    displayMovies(moviesAtThisDate);
  } else {
    movieList.innerHTML = `
        <div class="movie-item">
        <h3>Aucun film prévu ce jour là</h3>
        Vous pouvez ajouter un film grâce au formulaire ci-dessous.
        </div>
        `;
  }
}


// putain de mdr de complication !!!
function displayMovies(movies) {
  let content = [];
  movies.forEach((movie) => {

console.log("titre du film", movie.title);

    const singleMovieHTML = `
        <div class="movie-item">
            <h3>${movie.title}</h3>
            <span>année : ${movie.year}</span>
            <span>durée : ${movie.duration}</span>
            <span>genre : ${movie.genres.join(", ")}</span>
            </div>
            `;
    content = [...content, singleMovieHTML];
  });

  console.log(content);

  movieList.innerHTML = content.join("");
}