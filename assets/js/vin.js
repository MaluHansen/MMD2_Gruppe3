const hvidvinVarianterEl = document.querySelector(".hvidvinVarianter");
const rodvinVarianterEl = document.querySelector(".rodvinVarianter");
const alkoholfrieVinVarianterEl = document.querySelector(".alkoholfrieVinVarianter");
const vincocktailsVarianterEl = document.querySelector(".vincocktailsVarianter");
const roséVarianterEl = document.querySelector(".roséVarianter");
const naturvinVarianterEl = document.querySelector(".naturvinVarianter");
const kirsebaerlikorVarianterEl = document.querySelector(".kirsebaerlikorVarianter");
const portvinVarianterEl = document.querySelector(".portvinVarianter");
const bobleVarianterEl = document.querySelector(".bobleVarianter");


fetchAndRenderDrinks(rodvinVarianterEl, 12);
fetchAndRenderDrinks(hvidvinVarianterEl, 14);
fetchAndRenderDrinks(alkoholfrieVinVarianterEl, 17);
fetchAndRenderDrinks(bobleVarianterEl, 19);
fetchAndRenderDrinks(roséVarianterEl, 16);
fetchAndRenderDrinks(naturvinVarianterEl, 15);
fetchAndRenderDrinks(vincocktailsVarianterEl, 20);
fetchAndRenderDrinks(portvinVarianterEl, 18);
fetchAndRenderDrinks(kirsebaerlikorVarianterEl, 21);


// --- Til top knap --- 
// først erklærer vi en variabel ud fra vores HTML dokument som har klassen ".topBtn".
// Herefter tilføjer vi en eventlistener, som lytter efter scroll.
// Vi laver et if/else statement, som siger at hvis scrollY er større end 500, så skal knappen vises.
// Vi tilføjer også en eventlistener, som lytter efter et klik på knappen.
// Når der klikkes på knappen, skal der scrolles til toppen af siden.
let toTopBtn = document.querySelector(".topBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        toTopBtn.classList.add("active");
    } else {
        toTopBtn.classList.remove("active");
    }
    toTopBtn.addEventListener("click", () => {
        document.body.scrollTop = 0; // Safari
        document.documentElement.scrollTop = 0; // til Chrome, Firefix, IE og Opera
    });
});
// Til top-funktion er udarbejdet med inspiration fra følgende kilde: 
// How TO - Scroll Back To Top Button. W3School. 2024. [online] Accessed 9/6/2024. URL: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp