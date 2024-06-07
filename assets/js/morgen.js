// Variabler

const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100"

const morgenretterEl= document.querySelector(".morgenretter");
const brunchretterEl= document.querySelector(".brunchretter");
const spinnerEl = document.querySelector(".spinner");
const burgerEl = document.querySelector(".burger");

let morgenData;

// spinnerEl.classList.add("show"); // Tilføj klassen "show" til spinnerEl
// burgerEl.classList.add("show"); // Tilføj klassen "show" til burgerEl
// wineGlassEl.classList.add("show"); // Tilføj klassen "show" til wineGlassEl

// https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100&type-af-maltid=(Indsat Id)


fetch(baseUrl + `&type-af-maltid=` + 23)
.then(res => res.json())
.then(data => showData(data))
.catch(err => console.log("Fejl! Der er desværre sket en fejl.. Vi undskylder mange gange", err));
console.log(baseUrl + `&type-af-maltid=` + 23)

// Funktioner

function showData(data) {
    morgenretterEl.innerHTML = "";
}


// DOM manipulation 