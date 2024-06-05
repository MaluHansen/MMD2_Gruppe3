const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100"
const hvidvinVarianterEl = document.querySelector(".hvidvinVarianter")
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

function renderDrinksWithAnyPrice(containerToFill, drinks) {
    // Funktion til at tælle antallet af priser som gør at vi kan stille dem op senere efter hvor meget priser de enkelte øl har. 
    function countPrices(drink) {
        let count = 0;
        if (drink.acf.pris_for_lille_storrelse) count++;
        if (drink.acf.pris_for_mellem_storrelse) count++;
        if (drink.acf.pris_for_stor_storrelse) count++;
        if (drink.acf.pris_pr_flaske) count++;
        if (drink.acf.pris_pr_glas) count++;
        return count;
    }

    // Sorter øllerne efter antallet af priser i faldende rækkefølge. dvs. dem med flest priser først.
    drinks.sort((a, b) => {
        const priceCountDiff = countPrices(b) - countPrices(a);
        if (priceCountDiff !== 0) {
            return priceCountDiff;
        }
        return a.acf.navn_pa_drik.localeCompare(b.acf.navn_pa_drik);
    });

    // Opdel vores øl-array i to halvdele
    const midIndex = Math.ceil(drinks.length / 2);
    const firstHalf = drinks.slice(0, midIndex);
    const secondHalf = drinks.slice(midIndex);

    containerToFill.innerHTML = `
        <div class="drinksHalf1"></div>
        <div class="drinksHalf2"></div>
    `;

    const drinksHalf1El = document.querySelector(".drinksHalf1")
    const drinksHalf2El = document.querySelector(".drinksHalf2")

    // Render første halvdel i første kolonne
    firstHalf.forEach(drink => {
        let prisLille = drink.acf.pris_for_lille_storrelse ? `${drink.acf.pris_for_lille_storrelse},-/` : '';
        let prisMellem = drink.acf.pris_for_mellem_storrelse ? `${drink.acf.pris_for_mellem_storrelse},-/` : '';
        let prisStor = drink.acf.pris_for_stor_storrelse ? `${drink.acf.pris_for_stor_storrelse},-` : '';
        let prisGlas = drink.acf.pris_pr_glas ? `${drink.acf.pris_pr_glas},-/` : '';
        let prisFlaske = drink.acf.pris_pr_flaske ? `${drink.acf.pris_pr_flaske},-` : '';
        let drinkInfo = drink.acf.detaljerbeskrivelse_om_drikkevaren ? `${drink.acf.detaljerbeskrivelse_om_drikkevaren}` : '';
        let alkoholProcent = drink.acf.alkoholprocent ? `${drink.acf.alkoholprocent}` : '';


        drinksHalf1El.innerHTML += `
        <div class="drinkEnhed">
            <div class="titelOgPris">
                <p class="drinkTitle">${drink.acf.navn_pa_drik} ${alkoholProcent}</p>
                <p>${prisLille}${prisMellem}${prisStor}${prisGlas}${prisFlaske}</p>
            </div>
        <p class="drinkBeskrivelse">${drinkInfo}</p>
        </div>
   `;
    });

    // Render anden halvdel i anden kolonne
    secondHalf.forEach(drink => {
        let prisLille = drink.acf.pris_for_lille_storrelse ? `${drink.acf.pris_for_lille_storrelse},-/` : '';
        let prisMellem = drink.acf.pris_for_mellem_storrelse ? `${drink.acf.pris_for_mellem_storrelse},-/` : '';
        let prisStor = drink.acf.pris_for_stor_storrelse ? `${drink.acf.pris_for_stor_storrelse},-` : '';
        let prisGlas = drink.acf.pris_pr_glas ? `${drink.acf.pris_pr_glas},-/` : '';
        let prisFlaske = drink.acf.pris_pr_flaske ? `${drink.acf.pris_pr_flaske},-` : '';
        let drinkInfo = drink.acf.detaljerbeskrivelse_om_drikkevaren ? `${drink.acf.detaljerbeskrivelse_om_drikkevaren}` : '';
        let alkoholProcent = drink.acf.alkoholprocent ? `${drink.acf.alkoholprocent}` : '';

        drinksHalf2El.innerHTML += `
        <div class="drinkEnhed">
            <div class="titelOgPris">
                <p class="drinkTitle">${drink.acf.navn_pa_drik} ${alkoholProcent}</p>
                <p>${prisLille}${prisMellem}${prisStor}${prisGlas}${prisFlaske}</p>
            </div>
        <p class="drinkBeskrivelse">${drinkInfo}</p>
        </div>
   `;
    });
}

getDrinksByID(14)
    .then(drinks => renderDrinksWithAnyPrice(hvidvinVarianterEl, drinks))
    .catch(err => console.error("Fejl:", err));

// function getDrinksByID(Id) {
//     return fetch(baseUrl + `&type-af-drikkevarer=` + Id)
//         .then((res) => res.json())
//         .then((drinks) => {
//             drinkData = drinks;
//             return (drinks);
//         })
//         .catch(err => console.log("Fejl", err));
// }

// function renderDrinksWithTwoPrices(containerToFill, drinks) {
//     drinks.sort((a, b) => a.acf.pris_pr_flaske - b.acf.pris_pr_flaske);
//     // Sortere drinks efter pris_pr_flaske - Laveste pris først.

//     drinks.forEach(drink => {
//         let prisPrGlas = drink.acf.pris_pr_glas ? `${drink.acf.pris_pr_glas},-` : '-';
//         // Der tjekkes om drink.acf.pris_pr_glas har en "sand" værdi. Hvis pris_pr_glas ikke har noget data, erstattes det med "-" og gemmes i en variabel. Hvis den er "sand" dvs. at der er noget data. Så gemmes ${drink.acf.pris_pr_glas},- i variablen. 
//         let prisPrFlaske = drink.acf.pris_pr_flaske ? `${drink.acf.pris_pr_flaske},-` : '-';
//         // Der tjekkes om drink.acf.pris_pr_flaske har en "sand" eller "falsk" værdi. Hvis pris_pr_flaske ikke har noget data, erstattes det med "-" og gemmes i en variabel. Hvis den er "sand" dvs. at der er noget data. Så gemmes ${drink.acf.pris_pr_flaske},- i variablen. 

//         containerToFill.innerHTML += `<div class="drinkEnhed">
//         <div class="titelOgPris">
//             <p class="drinkTitle">${drink.acf.navn_pa_drik}</p>
//             <p>${prisPrGlas}/${prisPrFlaske}</p>
//         </div>
//         <p class="drinkBeskrivelse">${drink.acf.detaljerbeskrivelse_om_drikkevaren}</p>
//     </div>
//     `
//         // Indsætter ovenstående html i den agivet container for hver drink. 
//     });
// }

// function renderDrinksWithOnePrice(containerToFill, drinks) {
//     drinks.sort((a, b) => a.acf.pris_pr_glas.localeCompare(b.acf.pris_pr_glas));
//     // Sortere drinks efter pris_pr_glas - Laveste pris først.
//     drinks.forEach(drink => {
//         containerToFill.innerHTML += `<div class="drinkEnhed">
//         <div class="titelOgPris">
//             <p>${drink.acf.navn_pa_drik}</p>
//             <p>${drink.acf.pris_pr_glas},-</p>
//         </div>
//         <p class="drinkBeskrivelse">${drink.acf.detaljerbeskrivelse_om_drikkevaren}</p>
//     </div>
//     `
//         // Indsætter ovenstående html i den agivet container for hver drink. 
//     });
// }



// getDrinksByID(14)
//     .then(drinks => renderDrinksWithTwoPrices(hvidvinEl, drinks))
//     .catch(err => console.error("Fejl:", err));
// // Sørger for at funktionerne køre asyncront. Det vil sige at den næste funktion ikke foretages før den foregående er ovre.

// getDrinksByID(12)
//     .then(drinks => renderDrinksWithTwoPrices(rodvinEl, drinks))
//     .catch(err => console.error("Fejl:", err));

// getDrinksByID(17)
//     .then(drinks => renderDrinksWithTwoPrices(alkoholfriEl, drinks))
//     .catch(err => console.error("Fejl:", err));

// getDrinksByID(19)
//     .then(drinks => renderDrinksWithTwoPrices(boblerEl, drinks))
//     .catch(err => console.error("Fejl:", err));

// getDrinksByID(16)
//     .then(drinks => renderDrinksWithTwoPrices(roséEl, drinks))
//     .catch(err => console.error("Fejl:", err));

// getDrinksByID(15)
//     .then(drinks => renderDrinksWithTwoPrices(naturvinEl, drinks))
//     .catch(err => console.error("Fejl:", err));

// getDrinksByID(18)
//     .then(drinks => renderDrinksWithTwoPrices(portvinEl, drinks))
//     .catch(err => console.error("Fejl:", err));

// getDrinksByID(33)
//     .then(drinks => renderDrinksWithOnePrice(vincocktailsEl, drinks))
//     .catch(err => console.error("Fejl:", err));

// getDrinksByID(21)
//     .then(drinks => renderDrinksWithOnePrice(kirsebaerlikorEl, drinks))
//     .catch(err => console.error("Fejl:", err));



