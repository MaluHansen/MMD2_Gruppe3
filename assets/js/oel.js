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

// Vi opretter en funktion som kan hente drikkevarer ud fra et specifik ID som sættes som et parameter. 
function getDrinksByID(Id) {
    // Vi foretager en anmodning om at modtage noget data fra api'et som består af vores baseUrl + i dette tilfælde en query parameter som hedder &type-af-drikkevarer= + vores Id. Url'en vil derfor se således ud: https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100&type-af-drikkevarer=(Indsat Id)
    return fetch(baseUrl + `&type-af-drikkevarer=` + Id)
        // Når fetch er færdig og ikke før, så tager vi det data vi har modtaget og omdanner det fra JSON-objekt til et JavaScript-objekt. 
        .then((res) => res.json())
        // Når ovenstående er færdig så gemmer vi vores data i en variabel som er deklaret uden for funktionen. Vi kan dermed bruge vores data andre steder i scriptet. Hvis dette skulle blive nødvendigt. 
        .then((drinks) => {
            drinkData = drinks;
            return (drinks);
        })
        // I tilfælde af fejl under vores fetch vil der blive logget en besked i konsollen.
        .catch(err => console.log("Fejl! Der er desværre sket en fejl.. Vi undskylder mange gange", err));
}

function renderDrinksWithAnyPrice(containerToFill, drinks) {
    // Funktion der tæller antallet af priser som gør at vi kan stille dem op senere efter hvor mange priser de enkelte drikkevare har. 
    function countPrices(drink) {
        let count = 0;
        // Hvis der befinder sig noget i stien - så læg 1 til count.(Gælder alle if statements)
        if (drink.acf.pris_for_lille_storrelse) count++;
        if (drink.acf.pris_for_mellem_storrelse) count++;
        if (drink.acf.pris_for_stor_storrelse) count++;
        if (drink.acf.pris_pr_flaske) count++;
        if (drink.acf.pris_pr_glas) count++;
        return count;
    }

    // Sorter drikkevare efter antallet af priser i faldende rækkefølge. dvs. dem med flest priser først og hvis nogle har lige mange priser så skal de sorteres efter alfabetisk rækkefølge ud fra deres titel
    drinks.sort((a, b) => {
        // Beregn forskellen i antallet af priser mellem drikkevare 'b' og 'a'
        const priceCountDiff = countPrices(b) - countPrices(a);

        // Hvis priceCountDiff IKKE er lig med 0 så vil det være true og dermed return priceCountDiff. (dvs. der må ikke være forskel i antal priser hvis de skal sortere efter priser.)
        if (priceCountDiff !== 0) {
            return priceCountDiff;
        }

        //Hvis ovenstående er false - så skal der sorteres efter deres navne i alfabetisk rækkefølge.
        return a.acf.navn_pa_drik.localeCompare(b.acf.navn_pa_drik);
    });

    // Opdel vores array i to halvdele ved først at finde halvdelen af vores array. Det sker ved at dividere vores array med 2. Math.ceil runder op til nærmeste hele tal. 
    const midIndex = Math.ceil(drinks.length / 2);
    // Vi danner nu et nyt array ved at sige det skal indeholde alle drikkevare der er placeret fra index 0 til vores midIndex tal. 
    const firstHalf = drinks.slice(0, midIndex);
    // // Vi danner nu et andet array ved at sige det skal indeholde alle drikkevare der er placeret i de index der går fra vores midIndex og op efter. 
    const secondHalf = drinks.slice(midIndex);

    // Opretter 2 nye elementer med innerHTML. 
    containerToFill.innerHTML = `
        <div class="drinksHalf1"></div>
        <div class="drinksHalf2"></div>
    `;

    // Fanger vores nye elementer så vi kan referer til dem med JS. 
    const drinksHalf1El = containerToFill.querySelector(".drinksHalf1")
    const drinksHalf2El = containerToFill.querySelector(".drinksHalf2")

    // Indsætter første del af vores array i første kolonne. Til at starte med undersøger vi hvilke data vi har i de forskellige stier. Alt efter om der befinder sig noget eller ej så gemmes det i en variabel. 
    firstHalf.forEach(drink => {
        // Eks. Her undersøger vi om der befinder sig noget i pris_for_lille_storrelse hvis der gør det så skal det gemmes i en variable sammen med ",-/" hvis der ikke er noget. Så gemmer vi intet i vores variabel. 
        let prisLille = drink.acf.pris_for_lille_storrelse ? `${drink.acf.pris_for_lille_storrelse},-/` : '';
        let prisMellem = drink.acf.pris_for_mellem_storrelse ? `${drink.acf.pris_for_mellem_storrelse},-/` : '';
        let prisStor = drink.acf.pris_for_stor_storrelse ? `${drink.acf.pris_for_stor_storrelse},-` : '';
        let prisGlas = drink.acf.pris_pr_glas ? `${drink.acf.pris_pr_glas},-/` : '';
        let prisFlaske = drink.acf.pris_pr_flaske ? `${drink.acf.pris_pr_flaske},-` : '';
        let drinkInfo = drink.acf.detaljerbeskrivelse_om_drikkevaren ? `${drink.acf.detaljerbeskrivelse_om_drikkevaren}` : '';
        let alkoholProcent = drink.acf.alkoholprocent ? `${drink.acf.alkoholprocent}` : '';

        // Vi ændre vores HTML (DOM-MANIPULATION) med InnerHTML. Her placere vi navnet på drikkevaren og vores variabler. 
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

    // Her sker nøjagtig det samme som for den første del af vores array. Nu sker det bare for det andet array. 
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

getDrinksByID(11)
    .then(drinks => renderDrinksWithAnyPrice(fadolFlaskeolVarianterEl, drinks))
    .catch(err => console.error("Fejl:", err));

getDrinksByID(13)
    .then(drinks => renderDrinksWithAnyPrice(alkoholfrieOlVarianterEl, drinks))
    .catch(err => console.error("Fejl:", err));



