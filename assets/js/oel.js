const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100"
const fadolFlaskeolVarianterEl = document.querySelector(".fadolFlaskeolVarianter")
const alkoholfrieOlVarianterEl = document.querySelector(".alkoholfrieOlVarianter")
const spinnerEl = document.querySelector(".spinner");
const wineGlassEl = document.querySelector(".wineGlass");
const burgerEl = document.querySelector(".burger");

let drinkData;



fetchAndRenderDrinks(fadolFlaskeolVarianterEl, 11);
fetchAndRenderDrinks(alkoholfrieOlVarianterEl, 13);




