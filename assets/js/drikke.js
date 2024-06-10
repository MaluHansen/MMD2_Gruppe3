const juiceVarianterEl = document.querySelector(".juiceVarianter");
const saftVarianterEl = document.querySelector(".saftVarianter");
const kaffeVarianterEl = document.querySelector(".kaffeVarianter");
const ovrigeVarianterEl = document.querySelector(".ovrigeVarianter");

const spinnerEl = document.querySelector(".spinner");
const wineGlassEl = document.querySelector(".wineGlass");
const burgerEl = document.querySelector(".burger");

let drinkData;

fetchAndRenderDrinks(juiceVarianterEl, 29);
fetchAndRenderDrinks(saftVarianterEl, 30);
fetchAndRenderDrinks(kaffeVarianterEl, 31);
fetchAndRenderDrinks(ovrigeVarianterEl, 32);
