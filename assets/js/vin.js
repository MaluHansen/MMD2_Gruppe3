const hvidvinVarianterEl = document.querySelector(".hvidvinVarianter");
const rodvinVarianterEl = document.querySelector(".rodvinVarianter");
const alkoholfrieVinVarianterEl = document.querySelector(".alkoholfrieVinVarianter");
const vincocktailsVarianterEl = document.querySelector(".vincocktailsVarianter");
const roséVarianterEl = document.querySelector(".roséVarianter");
const naturvinVarianterEl = document.querySelector(".naturvinVarianter");
const kirsebaerlikorVarianterEl = document.querySelector(".kirsebaerlikorVarianter");
const portvinVarianterEl = document.querySelector(".portvinVarianter");
const bobleVarianterEl = document.querySelector(".bobleVarianter");


getPostsByID(`&type-af-drikkevarer=`, 14)
    .then(data => renderDrinksWithAnyPrice(hvidvinVarianterEl, data));

getPostsByID(`&type-af-drikkevarer=`, 12)
    .then(data => renderDrinksWithAnyPrice(rodvinVarianterEl, data));

getPostsByID(`&type-af-drikkevarer=`, 17)
    .then(data => renderDrinksWithAnyPrice(alkoholfrieVinVarianterEl, data));

getPostsByID(`&type-af-drikkevarer=`, 19)
    .then(data => renderDrinksWithAnyPrice(bobleVarianterEl, data));

getPostsByID(`&type-af-drikkevarer=`, 16)
    .then(data => renderDrinksWithAnyPrice(roséVarianterEl, data));

getPostsByID(`&type-af-drikkevarer=`, 15)
    .then(data => renderDrinksWithAnyPrice(naturvinVarianterEl, data));

getPostsByID(`&type-af-drikkevarer=`, 20)
    .then(data => renderDrinksWithAnyPrice(vincocktailsVarianterEl, data));

getPostsByID(`&type-af-drikkevarer=`, 18)
    .then(data => renderDrinksWithAnyPrice(portvinVarianterEl, data));

getPostsByID(`&type-af-drikkevarer=`, 21)
    .then(data => renderDrinksWithAnyPrice(kirsebaerlikorVarianterEl, data));


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