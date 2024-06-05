const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100"
const fadolFlaskeolVarianterEl = document.querySelector(".fadolFlaskeolVarianter")
const alkoholfrieOlVarianterEl = document.querySelector(".alkoholfrieOlVarianter")

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
        let drinkInfo = drink.acf.detaljerbeskrivelse_om_drikkevaren ? `${drink.acf.detaljerbeskrivelse_om_drikkevaren},-` : '';


        drinksHalf1El.innerHTML += `
        <div class="vinEnhed">
            <div class="titelOgPris">
                <p class="drinkTitle">${drink.acf.navn_pa_drik} ${drink.acf.alkoholprocent}%</p>
                <p>${prisLille}${prisMellem}${prisStor}${prisGlas}${prisFlaske}</p>
            </div>
        <p class="vinBeskrivelse">${drinkInfo}</p>
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
        let drinkInfo = drink.acf.detaljerbeskrivelse_om_drikkevaren ? `${drink.acf.detaljerbeskrivelse_om_drikkevaren},-` : '';

        drinksHalf2El.innerHTML += `
            <div class="vinEnhed">
                <div class="titelOgPris">
                    <p class="drinkTitle">${drink.acf.navn_pa_drik} ${drink.acf.alkoholprocent}%</p>
                    <p>${prisLille}${prisMellem}${prisStor}${prisGlas}${prisFlaske}</p>
                </div>
            <p class="vinBeskrivelse">${drinkInfo}</p>
            </div>
        `;
    });
}

getDrinksByID(11)
    .then(drinks => renderDrinksWithAnyPrice(fadolFlaskeolVarianterEl, drinks))
    .catch(err => console.error("Fejl:", err));

getDrinksByID(13)
    .then(drinks => renderDrinksWithAnyPrice(alkoholfrieOlVarianterEl, drinks))
    .catch(err => console.error("Fejl:", err));



