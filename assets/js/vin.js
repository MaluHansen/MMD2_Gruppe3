const hvidvinVarianterEl = document.querySelector(".hvidvinVarianter");
const rodvinVarianterEl = document.querySelector(".rodvinVarianter");
const alkoholfrieVinVarianterEl = document.querySelector(".alkoholfrieVinVarianter");
const vincocktailsVarianterEl = document.querySelector(".vincocktailsVarianter");
const roséVarianterEl = document.querySelector(".roséVarianter");
const naturvinVarianterEl = document.querySelector(".naturvinVarianter");
const kirsebaerlikorVarianterEl = document.querySelector(".kirsebaerlikorVarianter");
const portvinVarianterEl = document.querySelector(".portvinVarianter");
const bobleVarianterEl = document.querySelector(".bobleVarianter");
const spinnerEl = document.querySelector(".spinner");
const wineGlassEl = document.querySelector(".wineGlass");
const burgerEl = document.querySelector(".burger");

let drinkData;


fetchAndRenderDrinks(rodvinVarianterEl, 12);
fetchAndRenderDrinks(hvidvinVarianterEl, 14);
fetchAndRenderDrinks(alkoholfrieVinVarianterEl, 17);
fetchAndRenderDrinks(bobleVarianterEl, 19);
fetchAndRenderDrinks(roséVarianterEl, 16);
fetchAndRenderDrinks(naturvinVarianterEl, 15);
fetchAndRenderDrinks(vincocktailsVarianterEl, 20);
fetchAndRenderDrinks(portvinVarianterEl, 18);
fetchAndRenderDrinks(kirsebaerlikorVarianterEl, 21);
