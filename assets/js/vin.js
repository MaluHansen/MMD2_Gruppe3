const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100"
const hvidvinEl = document.querySelector(".hvidvin")
const rodvinEl = document.querySelector(".rodvin")
const alkoholfriEl = document.querySelector(".alkoholfri")
const vincocktailsEl = document.querySelector(".vincocktails")
const roséEl = document.querySelector(".rosé")
const naturvinEl = document.querySelector(".naturvin")
const kirsebaerlikorEl = document.querySelector(".kirsebaerlikor")
const portvinEl = document.querySelector(".portvin")
const boblerEl = document.querySelector(".bobler")

let drinkData;

function getDrinksByID(Id) {
    return fetch(baseUrl + `&type-af-drikkevarer=` + Id)
        .then((res) => res.json())
        .then((drinks) => {
            drinkData = drinks;
            return (drinks);
        })
        .catch(err => console.log("Fejl", err));
}

function renderDrinksWithTwoPrices(containerToFill, drinks) {
    drinks.sort((a, b) => a.acf.pris_pr_flaske.localeCompare(b.acf.pris_pr_flaske));
    drinks.forEach(drink => {
        containerToFill.innerHTML += `<div class="vinEnhed">
        <div class="titelOgPris">
            <p class="drinkTitle">${drink.acf.navn_pa_drik}</p>
            <p>${drink.acf.pris_pr_glas}/${drink.acf.pris_pr_flaske},-</p>
        </div>
        <p class="vinBeskrivelse">${drink.acf.detaljerbeskrivelse_om_drikkevaren}</p>
    </div>
    `
    });
}

function renderDrinksWithOnePrice(containerToFill, drinks) {
    drinks.sort((a, b) => a.acf.pris_pr_glas.localeCompare(b.acf.pris_pr_glas));
    drinks.forEach(drink => {
        containerToFill.innerHTML += `<div class="vinEnhed">
        <div class="titelOgPris">
            <p>${drink.acf.navn_pa_drik}</p>
            <p>${drink.acf.pris_pr_glas},-</p>
        </div>
        <p class="vinBeskrivelse">${drink.acf.detaljerbeskrivelse_om_drikkevaren}</p>
    </div>
    `
    });
}



getDrinksByID(14)
    .then(drinks => renderDrinksWithTwoPrices(hvidvinEl, drinks))
    .catch(err => console.error("Fejl:", err));

getDrinksByID(12)
    .then(drinks => renderDrinksWithTwoPrices(rodvinEl, drinks))
    .catch(err => console.error("Fejl:", err));

getDrinksByID(17)
    .then(drinks => renderDrinksWithTwoPrices(alkoholfriEl, drinks))
    .catch(err => console.error("Fejl:", err));

getDrinksByID(19)
    .then(drinks => renderDrinksWithTwoPrices(boblerEl, drinks))
    .catch(err => console.error("Fejl:", err));

getDrinksByID(16)
    .then(drinks => renderDrinksWithTwoPrices(roséEl, drinks))
    .catch(err => console.error("Fejl:", err));

getDrinksByID(15)
    .then(drinks => renderDrinksWithTwoPrices(naturvinEl, drinks))
    .catch(err => console.error("Fejl:", err));

getDrinksByID(18)
    .then(drinks => renderDrinksWithTwoPrices(portvinEl, drinks))
    .catch(err => console.error("Fejl:", err));

getDrinksByID(33)
    .then(drinks => renderDrinksWithOnePrice(vincocktailsEl, drinks))
    .catch(err => console.error("Fejl:", err));

getDrinksByID(21)
    .then(drinks => renderDrinksWithOnePrice(kirsebaerlikorEl, drinks))
    .catch(err => console.error("Fejl:", err));



