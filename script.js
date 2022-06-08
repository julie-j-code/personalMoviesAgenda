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
  },
});

let selectedDate = {};

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
    date: new Date(selectedDate),
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