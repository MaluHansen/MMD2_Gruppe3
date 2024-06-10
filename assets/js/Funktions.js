const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100"

// Vi opretter en funktion som kan hente drikkevarer ud fra et specifik ID som sættes som et parameter. 
function getDrinksByID(Id) {
    // Vi tilføjer klassen show så vores animation kan vises. 
    spinnerEl.classList.add("show"); // Tilføj klassen "show" til spinnerEl
    burgerEl.classList.add("show"); // Tilføj klassen "show" til burgerEl
    wineGlassEl.classList.add("show"); // Tilføj klassen "show" til wineGlassEl
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
        .catch(err => console.log("Fejl! Der er desværre sket en fejl..", err));
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
        let alkoholProcent = drink.acf.alkoholprocent ? `${drink.acf.alkoholprocent}%` : '';

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
        let alkoholProcent = drink.acf.alkoholprocent ? `${drink.acf.alkoholprocent}%` : '';

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

// Funktion der henter og indlæser vores drikkevarer.
function fetchAndRenderDrinks(containerToFill, id) {
    // Henter drikkevarer med funktionen "getDrinksByID" og returnere et array med drikkevarer.
    getDrinksByID(id).then(drinks => {
        // Der anvendes setTimeout metode der forsinker funktionen med 2 sekunder. Den funktion der forsinkes er "renderDrinksWithAnyPrice", samt at burgerEl, wineGlassEl og spinnerEl skjules. Dette gør vi for at vores animation kan nå at kører. 
        setTimeout(() => {
            renderDrinksWithAnyPrice(containerToFill, drinks);
            burgerEl.classList.remove("show");
            wineGlassEl.classList.remove("show");
            spinnerEl.classList.remove("show");
            // Skjul burgerEl, wineGlassEl og spinnerEl ved at fjerne klassen "show"
        }, 2200);
    }).catch(err => console.error("Fejl:", err));
}

//function som henter data fra API. 
function getAllvariations(id) {
    return fetch(baseUrl + `&type-af-maltid=` + id)
        .then((res) => res.json())
        .then((variations) => {
            variationData = variations;
            console.log('variationData:', variationData)
            return (variations);
        })
        .catch(err => console.log("Fejl", err));
}

//function som viser dataen hentet igennem GetAllVariations funktion.(vælger cont)
function showAllvariations(containerToFill, variations) {
    variations.forEach(variation => {
        containerToFill.innerHTML += `
        <div class="titleOgPris">
            <p class="soedesagerTitle">${variation.acf.navn_pa_ret} ${variation.acf.diaet_praeference ? `<i class="material-symbols-outlined">eco</i></p>` : ``}</p>
            <p class="soedesagerPris">${variation.acf.pris},-</p>
        </div>
               
        `;
    });
}

function showAllvariationsForEvening(containerToFill, variations) {
    variations.forEach(variation => {
        containerToFill.innerHTML += `
        <div class="middagsContainer">
            <div class="titelOgPris">
                <p class="title">${variation.acf.navn_pa_ret}${variation.acf.diaet_praeference ? `<i class="material-symbols-outlined">eco</i></p>` : ``}</p>
                <p class="pris">${variation.acf.pris},-</p>
            </div>
            <div class="detaljerOgSupplerende">
            ${variation.acf.detaljer_om_retten ? `<p>${variation.acf.detaljer_om_retten}</p>` : ``}
            </div>
        `;
    });
}

// --- MORGENRETTER ---
// Funktion til at hente data fra Wordpress API'en
function fetchMorgendata() {
    fetch(baseUrl + `&type-af-maltid=` + 23)
        .then(res => res.json())
        .then(data => showMorgenData(data))
        .catch(err => console.log("Fejl! Der er desværre sket en fejl.. Vi undskylder mange gange", err));
    console.log(baseUrl + `&type-af-maltid=` + 23)
}


// Funktion til at vise data i HTML'en
function showMorgenData(data) {
    morgenretterEl.innerHTML += `
    `;

    // forEach loop til at loope igennem dataen fra Wordpress, og indsætte det i HTML'en vha. innerHTML
    // i loopet anvendes en function til at indsætte data i en variabel kaldet "morgenData"
    // Vi anvender en ternary operator til at tjekke om der er yderligere data der skal indsættes i HTML'en. 
    //  Det anvendes eftersom vi vil lave en filtrering midt i InnerHTML'en.
    // Konkret har vi brugt en ternary operator til at tjekke om der er data i felterne "detaljer_om_retten", "variationer_af_retten" og "diaet_praeference".
    // Hvis der er data i felterne, skal det indsættes i HTML'en. Hvis ikke, skal det ikke indsættes.
    // Fx. betyder: morgenData.acf.detaljer_om_retten ? (HVIS der er data) : så indsættes dataen under class"beskrivelse" : (hvis ikke) så indsættes intet ``.
    // KILDE til ternary operator: Conditional (ternary) operator. Mozilla Corporations. 2024. [online] Accessed 4/6/2024. URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator.
    data.forEach(function (morgenData) {
        morgenretterEl.innerHTML += `
        <div class="titelOgPris">
        <p class="title">${morgenData.acf.navn_pa_ret} ${morgenData.diaet_praeference.length > 0 ? `<i class="material-symbols-outlined">eco</i>` : ``}</p>
        <p>${morgenData.acf.pris},- </p>
        </div>
        <div class="detaljerOgSupplerende">
        ${morgenData.acf.detaljer_om_retten ? `<p class="beskrivelse">${morgenData.acf.detaljer_om_retten}</p>` : ``}
        </div>
        `;
    })
}

// --- BRUNCH RETTER ---
// Funktion til at hente data fra Wordpress API'en
function fetchBrunchdata() {
    fetch(baseUrl + `&type-af-maltid=` + 22)
        .then(res => res.json())
        .then(data => showBrunchData(data))
        .catch(err => console.log("Fejl! Der er desværre sket en fejl.. Vi undskylder mange gange", err));
}

// Funktion til at vise data i HTML'en
function showBrunchData(data) {
    brunchretterEl.innerHTML += `
    `;

    data.forEach(function (brunchData) {
        brunchretterEl.innerHTML += `
        <div class="pris">
        <p>${brunchData.acf.pris},-</p>
        </div>
        <div class="VariationerAfRetten">
            ${brunchData.acf.variationer_af_retten.variation_1.beskrivelse_af_retten ? `<p class="beskrivelse">${brunchData.acf.variationer_af_retten.variation_1.beskrivelse_af_retten}</p>` : ``}
            ${brunchData.acf.variationer_af_retten.variation_2.beskrivelse_af_retten ? `<p class="beskrivelse">${brunchData.acf.variationer_af_retten.variation_2.beskrivelse_af_retten}</p>` : ``}
            ${brunchData.acf.variationer_af_retten.variation_3.beskrivelse_af_retten ? `<p class="beskrivelse">${brunchData.acf.variationer_af_retten.variation_3.beskrivelse_af_retten}</p>` : ``}
            ${brunchData.acf.variationer_af_retten.variation_4.beskrivelse_af_retten ? `<p class="beskrivelse">${brunchData.acf.variationer_af_retten.variation_4.beskrivelse_af_retten}</p>` : ``}
            ${brunchData.acf.variationer_af_retten.variation_5.beskrivelse_af_retten ? `<p class="beskrivelse">${brunchData.acf.variationer_af_retten.variation_5.beskrivelse_af_retten}</p>` : ``}
            ${brunchData.acf.variationer_af_retten.variation_6.beskrivelse_af_retten ? `<p class="beskrivelse">${brunchData.acf.variationer_af_retten.variation_6.beskrivelse_af_retten}</p>` : ``}
            ${brunchData.acf.variationer_af_retten.variation_7.beskrivelse_af_retten ? `<p class="beskrivelse">${brunchData.acf.variationer_af_retten.variation_7.beskrivelse_af_retten}</p>` : ``}
            ${brunchData.acf.variationer_af_retten.variation_8.beskrivelse_af_retten ? `<p class="beskrivelse">${brunchData.acf.variationer_af_retten.variation_8.beskrivelse_af_retten}</p>` : ``}   
        </div>
    `;
    })
}

// --- MIDDAGSRETTER ---
// Funktion til at hente middags-data fra Wordpress API'en
function fetchMiddagsdata() {
    fetch(baseUrl + `&type-af-maltid=` + 24)
        .then(res => res.json())
        .then(data => showMiddagsData(data))
        .catch(err => console.log("Fejl! Der er desværre sket en fejl.. Vi undskylder mange gange", err));
}

// Funktion til at vise middags-data i HTML'en
function showMiddagsData(data) {
    middagsmenuEl.innerHTML += `
        `;


    // forEach loop til at loope igennem dataen fra Wordpress, og indsætte det i HTML'en vha. innerHTML
    data.forEach(function (middagsData) {
        middagsmenuEl.innerHTML += `
        <div class="middagsContainer">
            <div class="titelOgPris">
                <p class="title">${middagsData.acf.navn_pa_ret}</p>
                <p class="pris">${middagsData.acf.pris}</p>
            </div>
            <div class="detaljerOgSupplerende">
            ${middagsData.acf.detaljer_om_retten ? `<p>${middagsData.acf.detaljer_om_retten}</p>` : ``}
            </div>
            <div class="variationer">
                <div class="variationContainer">
                    ${middagsData.acf.variationer_af_retten.variation_1.beskrivelse_af_retten ? `<p> - ${middagsData.acf.variationer_af_retten.variation_1.beskrivelse_af_retten} ${middagsData.acf.variationer_af_retten.diaet_praeference_1 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
                    ${middagsData.acf.variationer_af_retten.variation_1.pris ? `<p>${middagsData.acf.variationer_af_retten.variation_1.pris} ,- </p>` : ``}
                </div>
                <div class="variationContainer">    
                    ${middagsData.acf.variationer_af_retten.variation_2.beskrivelse_af_retten ? `<p> - ${middagsData.acf.variationer_af_retten.variation_2.beskrivelse_af_retten} ${middagsData.acf.variationer_af_retten.diaet_praeference_2 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
                    ${middagsData.acf.variationer_af_retten.variation_2.pris ? `<p >${middagsData.acf.variationer_af_retten.variation_2.pris} ,- </p>` : ``}
                </div>
                <div class="variationContainer">
                    ${middagsData.acf.variationer_af_retten.variation_3.beskrivelse_af_retten ? `<p> - ${middagsData.acf.variationer_af_retten.variation_3.beskrivelse_af_retten} ${middagsData.acf.variationer_af_retten.diaet_praeference_3 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
                    ${middagsData.acf.variationer_af_retten.variation_3.pris ? `<p>${middagsData.acf.variationer_af_retten.variation_3.pris} ,- </p>` : ``}
                </div>
                <div class="variationContainer">
                    ${middagsData.acf.variationer_af_retten.variation_4.beskrivelse_af_retten ? `<p> - ${middagsData.acf.variationer_af_retten.variation_4.beskrivelse_af_retten} ${middagsData.acf.variationer_af_retten.diaet_praeference_4 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}             
                    ${middagsData.acf.variationer_af_retten.variation_4.pris ? `<p>${middagsData.acf.variationer_af_retten.variation_4.pris} ,- </p>` : ``}
                    </div>
                <div class="variationContainer">
                    ${middagsData.acf.variationer_af_retten.variation_5.beskrivelse_af_retten ? `<p> - ${middagsData.acf.variationer_af_retten.variation_5.beskrivelse_af_retten} ${middagsData.acf.variationer_af_retten.diaet_praeference_5 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
                    ${middagsData.acf.variationer_af_retten.variation_5.pris ? `<p>${middagsData.acf.variationer_af_retten.variation_5.pris} ,- </p>` : ``}
                </div>
                <div class="variationContainer">
                    ${middagsData.acf.variationer_af_retten.variation_6.beskrivelse_af_retten ? `<p> - ${middagsData.acf.variationer_af_retten.variation_6.beskrivelse_af_retten} ${middagsData.acf.variationer_af_retten.diaet_praeference_6 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
                    ${middagsData.acf.variationer_af_retten.variation_6.pris ? `<p>${middagsData.acf.variationer_af_retten.variation_6.pris} ,- </p>` : ``}
                </div>
                <div class="variationContainer">
                    ${middagsData.acf.variationer_af_retten.variation_7.beskrivelse_af_retten ? `<p> - ${middagsData.acf.variationer_af_retten.variation_7.beskrivelse_af_retten} ${middagsData.acf.variationer_af_retten.diaet_praeference_7 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
                    ${middagsData.acf.variationer_af_retten.variation_7.pris ? `<p>${middagsData.acf.variationer_af_retten.variation_7.pris} ,- </p>` : ``}
                </div>
                <div class="variationContainer">
                    ${middagsData.acf.variationer_af_retten.variation_8.beskrivelse_af_retten ? `<p> - ${middagsData.acf.variationer_af_retten.variation_8.beskrivelse_af_retten} ${middagsData.acf.variationer_af_retten.diaet_praeference_8 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
                    ${middagsData.acf.variationer_af_retten.variation_8.pris ? `<p>${middagsData.acf.variationer_af_retten.variation_8.pris} ,- </p>` : ``}
                </div>
            </div>
        </div>
        `;
    })
}

// --- SNACK RETTER ---
// Funktion til at snack-hente data fra Wordpress API'en
function fetchSnackdata() {
    fetch(baseUrl + `&type-af-maltid=` + 25)
        .then(res => res.json())
        .then(data => showSnackData(data))
        .catch(err => console.log("Fejl! Der er desværre sket en fejl.. Vi undskylder mange gange", err));
}

// Funktion til at vise snack-data i HTML'en
function showSnackData(data) {
    snacksEl.innerHTML += `
    `;

    data.forEach(function (snackData) {
        snacksEl.innerHTML += `
        <div class="variationer">
        <div class="variationContainer">
            ${snackData.acf.variationer_af_retten.variation_1.beskrivelse_af_retten ? `<p> - ${snackData.acf.variationer_af_retten.variation_1.beskrivelse_af_retten} ${snackData.acf.variationer_af_retten.diaet_praeference_1 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
            ${snackData.acf.variationer_af_retten.variation_1.pris ? `<p>${snackData.acf.variationer_af_retten.variation_1.pris} ,- </p>` : ``}
        </div>
        <div class="variationContainer">    
            ${snackData.acf.variationer_af_retten.variation_2.beskrivelse_af_retten ? `<p> - ${snackData.acf.variationer_af_retten.variation_2.beskrivelse_af_retten} ${snackData.acf.variationer_af_retten.diaet_praeference_2 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
            ${snackData.acf.variationer_af_retten.variation_2.pris ? `<p >${snackData.acf.variationer_af_retten.variation_2.pris} ,- </p>` : ``}
        </div>
        <div class="variationContainer">
            ${snackData.acf.variationer_af_retten.variation_3.beskrivelse_af_retten ? `<p> - ${snackData.acf.variationer_af_retten.variation_3.beskrivelse_af_retten} ${snackData.acf.variationer_af_retten.diaet_praeference_3 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
            ${snackData.acf.variationer_af_retten.variation_3.pris ? `<p>${snackData.acf.variationer_af_retten.variation_3.pris} ,- </p>` : ``}
        </div>
        <div class="variationContainer">
            ${snackData.acf.variationer_af_retten.variation_4.beskrivelse_af_retten ? `<p> - ${snackData.acf.variationer_af_retten.variation_4.beskrivelse_af_retten} ${snackData.acf.variationer_af_retten.diaet_praeference_4 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}             
            ${snackData.acf.variationer_af_retten.variation_4.pris ? `<p>${snackData.acf.variationer_af_retten.variation_4.pris} ,- </p>` : ``}
            </div>
        <div class="variationContainer">
            ${snackData.acf.variationer_af_retten.variation_5.beskrivelse_af_retten ? `<p> - ${snackData.acf.variationer_af_retten.variation_5.beskrivelse_af_retten} ${snackData.acf.variationer_af_retten.diaet_praeference_5 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
            ${snackData.acf.variationer_af_retten.variation_5.pris ? `<p>${snackData.acf.variationer_af_retten.variation_5.pris} ,- </p>` : ``}
        </div>
        <div class="variationContainer">
            ${snackData.acf.variationer_af_retten.variation_6.beskrivelse_af_retten ? `<p> - ${snackData.acf.variationer_af_retten.variation_6.beskrivelse_af_retten} ${snackData.acf.variationer_af_retten.diaet_praeference_6 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
            ${snackData.acf.variationer_af_retten.variation_6.pris ? `<p>${snackData.acf.variationer_af_retten.variation_6.pris} ,- </p>` : ``}
        </div>
        <div class="variationContainer">
            ${snackData.acf.variationer_af_retten.variation_7.beskrivelse_af_retten ? `<p> - ${snackData.acf.variationer_af_retten.variation_7.beskrivelse_af_retten} ${snackData.acf.variationer_af_retten.diaet_praeference_7 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
            ${snackData.acf.variationer_af_retten.variation_7.pris ? `<p>${snackData.acf.variationer_af_retten.variation_7.pris} ,- </p>` : ``}
        </div>
        <div class="variationContainer">
            ${snackData.acf.variationer_af_retten.variation_8.beskrivelse_af_retten ? `<p> - ${snackData.acf.variationer_af_retten.variation_8.beskrivelse_af_retten} ${snackData.acf.variationer_af_retten.diaet_praeference_8 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
            ${snackData.acf.variationer_af_retten.variation_8.pris ? `<p>${snackData.acf.variationer_af_retten.variation_8.pris} ,- </p>` : ``}
        </div>
    </div>
        `;
    })
}

function getAllevents() {
    return fetch(baseUrl + `&categories=5`)
        .then((res) => res.json())
        .then((events) => {
            eventdata = events;
            return (events);
        })
        .catch(err => console.log("Fejl", err));
}

function showAllevents(containerToFill, events) {
    events.forEach(event => {
        containerToFill.innerHTML += `
        
       <div class="eventCard"> 
         <picture>
         <source media="(min-width: 600px)" srcset="${event.acf.billede_af_begivenhed.sizes.large}">
          <img src="${event.acf.billede_af_begivenhed.sizes.medium} loading="lazy">
         </picture>
         <h4>${event.acf.titel_pa_begivenhed}</h4>
        <p>${event.acf.beskrivelse_af_begivenhed}</p>
        <div class="eventCardinfo">

            <div class="infoEnhed">
                <i class="material-symbols-outlined">credit_card
              <p>${event.acf.pris}</p></i>
         </div>
            <div class="infoEnhed">
              <i class="material-symbols-outlined">schedule
              <p>${event.acf.starttidspunkt}</p></i>
         </div>
         <div class="infoEnhed">
             <i class="material-symbols-outlined">calendar_month
             <p>${event.acf.dato_for_begivenhed}</p></i>
         </div>

        </div>
        </div>
        
    `
    });
}