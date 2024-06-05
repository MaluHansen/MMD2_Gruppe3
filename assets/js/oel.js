const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100"
const hvidvinEl = document.querySelector(".hvidvin")


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

function renderDrinksWithOnePrice(containerToFill, drinks) {
    drinks.sort((a, b) => a.acf.pris_pr_glas.localeCompare(b.acf.pris_pr_glas));
    // Sortere drinks efter pris_pr_glas - Laveste pris først.
    drinks.forEach(drink => {
        containerToFill.innerHTML += `<div class="vinEnhed">
        <div class="titelOgPris">
            <p>${drink.acf.navn_pa_drik}</p>
            <p>${drink.acf.pris_pr_glas},-</p>
        </div>
        <p class="vinBeskrivelse">${drink.acf.detaljerbeskrivelse_om_drikkevaren}</p>
    </div>
    `
        // Indsætter ovenstående html i den agivet container for hver drink. 
    });
}

function renderDrinksWithTwoPrices(containerToFill, drinks) {
    drinks.sort((a, b) => a.acf.pris_pr_flaske - b.acf.pris_pr_flaske);
    // Sortere drinks efter pris_pr_flaske - Laveste pris først.

    drinks.forEach(drink => {
        let prisPrGlas = drink.acf.pris_pr_glas ? `${drink.acf.pris_pr_glas},-` : '-';
        // Der tjekkes om drink.acf.pris_pr_glas har en "sand" værdi. Hvis pris_pr_glas ikke har noget data, erstattes det med "-" og gemmes i en variabel. Hvis den er "sand" dvs. at der er noget data. Så gemmes ${drink.acf.pris_pr_glas},- i variablen. 
        let prisPrFlaske = drink.acf.pris_pr_flaske ? `${drink.acf.pris_pr_flaske},-` : '-';
        // Der tjekkes om drink.acf.pris_pr_flaske har en "sand" eller "falsk" værdi. Hvis pris_pr_flaske ikke har noget data, erstattes det med "-" og gemmes i en variabel. Hvis den er "sand" dvs. at der er noget data. Så gemmes ${drink.acf.pris_pr_flaske},- i variablen. 

        containerToFill.innerHTML += `<div class="vinEnhed">
        <div class="titelOgPris">
            <p class="drinkTitle">${drink.acf.navn_pa_drik}</p>
            <p>${prisPrGlas}/${prisPrFlaske}</p>
        </div>
        <p class="vinBeskrivelse">${drink.acf.detaljerbeskrivelse_om_drikkevaren}</p>
    </div>
    `
        // Indsætter ovenstående html i den agivet container for hver drink. 
    });
}

function renderDrinksWithThreePrices(containerToFill, drinks) {
    drinks.sort((a, b) => a.acf.pris_pr_flaske - b.acf.pris_pr_flaske);
    // Sortere drinks efter pris_pr_flaske - Laveste pris først.

    drinks.forEach(drink => {
        let prisPrGlas = drink.acf.pris_pr_glas ? `${drink.acf.pris_pr_glas},-` : '-';
        // Der tjekkes om drink.acf.pris_pr_glas har en "sand" værdi. Hvis pris_pr_glas ikke har noget data, erstattes det med "-" og gemmes i en variabel. Hvis den er "sand" dvs. at der er noget data. Så gemmes ${drink.acf.pris_pr_glas},- i variablen. 
        let prisPrFlaske = drink.acf.pris_pr_flaske ? `${drink.acf.pris_pr_flaske},-` : '-';
        // Der tjekkes om drink.acf.pris_pr_flaske har en "sand" eller "falsk" værdi. Hvis pris_pr_flaske ikke har noget data, erstattes det med "-" og gemmes i en variabel. Hvis den er "sand" dvs. at der er noget data. Så gemmes ${drink.acf.pris_pr_flaske},- i variablen. 

        containerToFill.innerHTML += `<div class="vinEnhed">
        <div class="titelOgPris">
            <p class="drinkTitle">${drink.acf.navn_pa_drik}</p>
            <p>${prisPrGlas}/${prisPrFlaske}/</p>
        </div>
        <p class="vinBeskrivelse">${drink.acf.detaljerbeskrivelse_om_drikkevaren}</p>
    </div>
    `
        // Indsætter ovenstående html i den agivet container for hver drink. 
    });
}




getDrinksByID(14)
    .then(drinks => renderDrinksWithTwoPrices(hvidvinEl, drinks))
    .catch(err => console.error("Fejl:", err));
// Sørger for at funktionerne køre asyncront. Det vil sige at den næste funktion ikke foretages før den foregående er ovre.

getDrinksByID(12)
    .then(drinks => renderDrinksWithTwoPrices(rodvinEl, drinks))
    .catch(err => console.error("Fejl:", err));

getDrinksByID(21)
    .then(drinks => renderDrinksWithOnePrice(kirsebaerlikorEl, drinks))
    .catch(err => console.error("Fejl:", err));



