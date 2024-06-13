const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100"
const spinnerEl = document.querySelector(".spinner");
const navMobil = document.querySelector('.navMobil');
const logoUllaEl = document.querySelector('#logoUlla');
const burgerMenu = document.querySelector('#burgerMenu');
const body = document.body;

// Vi opretter en funktion som kan hente drikkevarer ud fra et specifik ID som sættes som et parameter. 
function getDrinksByID(Id) {
    // Vi foretager en anmodning om at modtage noget data fra api'et som består af vores baseUrl + i dette tilfælde en query parameter som hedder &type-af-drikkevarer= + vores Id. Url'en vil derfor se således ud: https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100&type-af-drikkevarer=(Indsat Id)
    return fetch(baseUrl + `&type-af-drikkevarer=` + Id)
        // Når fetch er færdig og ikke før, så tager vi det data vi har modtaget og omdanner det fra JSON-objekt til et JavaScript-objekt. 
        .then((res) => res.json())
        // Når ovenstående er færdig så gemmer vi vores data i en variabel som er deklaret uden for funktionen. Vi kan dermed bruge vores data andre steder i scriptet. Hvis dette skulle blive nødvendigt. 
        .then((drinks) => {
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
                <p>${prisGlas}${prisLille}${prisMellem}${prisStor}${prisFlaske}</p>
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

function fetchAndRenderDrinks(containerToFill, id) {
    // Vis spinneren mens data hentes
    spinnerEl.classList.add("show");
    // Henter drikkevarer med funktionen "getDrinksByID" og returnerer et array med drikkevarer.
    getDrinksByID(id).then(drinks => {
        // Render drinks og skjul spinneren når data er hentet
        renderDrinksWithAnyPrice(containerToFill, drinks);
        spinnerEl.classList.remove("show");
    }).catch(err => {
        console.error("Fejl:", err);
        // Skjul spinneren i tilfælde af en fejl
        spinnerEl.classList.remove("show");
    });
}

//function som henter data fra API. 
function getAllvariations(id) {
    spinnerEl.classList.add("show");
    return fetch(baseUrl + `&type-af-maltid=` + id)
        .then((res) => res.json())
        .then((variations) => {
            return (variations);
        })
        .catch(err => console.log("Fejl", err));
}

//function som viser dataen hentet igennem GetAllVariations funktion.(vælger cont)
function showAllvariations(containerToFill, variations) {
    spinnerEl.classList.add("show");
    variations.forEach(variation => {
        containerToFill.innerHTML += `
        <div class="titleOgPris">
            <p class="soedesagerTitle">${variation.acf.navn_pa_ret} ${variation.acf.diaet_praeference ? `<i class="material-symbols-outlined">eco</i></p>` : ``}</p>
            <p class="soedesagerPris">${variation.acf.pris},-</p>
        </div>
               
        `;
    });
    spinnerEl.classList.remove("show");
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
    spinnerEl.classList.remove("show");
}

// --- MORGENRETTER ---
// Funktion til at hente data fra Wordpress API'en
function fetchMorgendata() {
    spinnerEl.classList.add("show");
    fetch(baseUrl + `&type-af-maltid=` + 23)
        .then(res => res.json())
        .then(data => {
            showMorgenData(data);
            spinnerEl.classList.remove("show");
        })
        .catch(err => console.log("Fejl! Der er desværre sket en fejl.. Vi undskylder mange gange", err));
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
        <div class="drinkEnhed2">
            <div class="titelOgPris">
            <p class="title2">${morgenData.acf.navn_pa_ret} ${morgenData.diaet_praeference.length > 0 ? `<i class="material-symbols-outlined">eco</i>` : ``}</p>
            <p>${morgenData.acf.pris},- </p>
            </div>
        <div class="detaljerOgSupplerende">
        ${morgenData.acf.detaljer_om_retten ? `<p class="beskrivelse">${morgenData.acf.detaljer_om_retten}</p>` : ``}
        </div>
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
        <div class="drinkEnhed3">
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
        <div class="pris">
        <p>${brunchData.acf.pris},-</p>
        </div>
        </div>
    `;
    })
}

// --- MIDDAGSRETTER ---
// Funktion til at hente middags-data fra Wordpress API'en
function fetchMiddagsdata() {
    spinnerEl.classList.add("show");
    fetch(baseUrl + `&type-af-maltid=` + 24)
        .then(res => res.json())
        .then(data => {
            showMiddagsData(data);
            spinnerEl.classList.remove("show");
        })
        .catch(err => console.log("Fejl! Der er desværre sket en fejl.. Vi undskylder mange gange", err));
}

// Funktion til at vise middags-data i HTML'en
function showMiddagsData(data) {
    middagsmenuEl.innerHTML += `
        `;

    // Gennemgår hver middagsdata i vores array med forEach
    data.forEach(function (middagsData) {
        // Skaber en tom string til opbevarer vores HTML for de forskellige variationer
        let variationsHTML = '';

        // Hent variationerne fra middagsdata
        const variations = middagsData.acf.variationer_af_retten;

        // Løkke fra 1 til 8 for at gennemgå alle mulige variationer
        for (let i = 1; i <= 8; i++) {
            // Gemmer variationen og dens diætpræference for hver loop den kører igennem. 
            const variation = variations[`variation_${i}`];
            const diaetPraeference = variations[`diaet_praeference_${i}`];

            // Hvis variationen og dens beskrivelse findes, så skal der tilføjes følgende HTML til vores variabel variationHTML. Vi får derfor for hvert tal i vores for loope en string ind med HTML så længe der findes en variation og en beskrivelse af retten. Vi kan maks få 8 string ind da vores forloop ikke tæller til mere. 
            if (variation && variation.beskrivelse_af_retten) {
                variationsHTML += `
                <div class="variationContainer">
                    <p> - ${variation.beskrivelse_af_retten} ${diaetPraeference ? `<i class="material-symbols-outlined">eco</i></p>` : ''}</p>
                    ${variation.pris ? `<p>${variation.pris},-</p>` : ''}
                </div>
            `;
            }
        }

        // Hvis variationsHTML indeholder nogen string/strings så skal der tilføjes middagsContainer med tilhørende html til vores middagsmenuEl.
        if (variationsHTML) {
            middagsmenuEl.innerHTML += `
            <div class="middagsContainer">
                <!-- Titel og pris på retten -->
                <div class="titelOgPris">
                    <p class="title">${middagsData.acf.navn_pa_ret}</p>
                    <p class="pris">${middagsData.acf.pris ? `${middagsData.acf.pris},-` : ''}</p>
                </div>
                <!-- Detaljer om retten -->
                <div class="detaljerOgSupplerende">
                    ${middagsData.acf.detaljer_om_retten ? `<p>${middagsData.acf.detaljer_om_retten}</p>` : ''}
                </div>
                <!-- Variationer af retten -->
                <div class="variationer">
                    ${variationsHTML}
                </div>
            </div>
        `;
        }
    });

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
            ${snackData.acf.variationer_af_retten.variation_1.pris ? `<p>${snackData.acf.variationer_af_retten.variation_1.pris},- </p>` : ``}
        </div>
        <div class="variationContainer">    
            ${snackData.acf.variationer_af_retten.variation_2.beskrivelse_af_retten ? `<p> - ${snackData.acf.variationer_af_retten.variation_2.beskrivelse_af_retten} ${snackData.acf.variationer_af_retten.diaet_praeference_2 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
            ${snackData.acf.variationer_af_retten.variation_2.pris ? `<p >${snackData.acf.variationer_af_retten.variation_2.pris},- </p>` : ``}
        </div>
        <div class="variationContainer">
            ${snackData.acf.variationer_af_retten.variation_3.beskrivelse_af_retten ? `<p> - ${snackData.acf.variationer_af_retten.variation_3.beskrivelse_af_retten} ${snackData.acf.variationer_af_retten.diaet_praeference_3 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
            ${snackData.acf.variationer_af_retten.variation_3.pris ? `<p>${snackData.acf.variationer_af_retten.variation_3.pris},- </p>` : ``}
        </div>
        <div class="variationContainer">
            ${snackData.acf.variationer_af_retten.variation_4.beskrivelse_af_retten ? `<p> - ${snackData.acf.variationer_af_retten.variation_4.beskrivelse_af_retten} ${snackData.acf.variationer_af_retten.diaet_praeference_4 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}             
            ${snackData.acf.variationer_af_retten.variation_4.pris ? `<p>${snackData.acf.variationer_af_retten.variation_4.pris},- </p>` : ``}
            </div>
        <div class="variationContainer">
            ${snackData.acf.variationer_af_retten.variation_5.beskrivelse_af_retten ? `<p> - ${snackData.acf.variationer_af_retten.variation_5.beskrivelse_af_retten} ${snackData.acf.variationer_af_retten.diaet_praeference_5 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
            ${snackData.acf.variationer_af_retten.variation_5.pris ? `<p>${snackData.acf.variationer_af_retten.variation_5.pris},- </p>` : ``}
        </div>
        <div class="variationContainer">
            ${snackData.acf.variationer_af_retten.variation_6.beskrivelse_af_retten ? `<p> - ${snackData.acf.variationer_af_retten.variation_6.beskrivelse_af_retten} ${snackData.acf.variationer_af_retten.diaet_praeference_6 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
            ${snackData.acf.variationer_af_retten.variation_6.pris ? `<p>${snackData.acf.variationer_af_retten.variation_6.pris},- </p>` : ``}
        </div>
        <div class="variationContainer">
            ${snackData.acf.variationer_af_retten.variation_7.beskrivelse_af_retten ? `<p> - ${snackData.acf.variationer_af_retten.variation_7.beskrivelse_af_retten} ${snackData.acf.variationer_af_retten.diaet_praeference_7 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
            ${snackData.acf.variationer_af_retten.variation_7.pris ? `<p>${snackData.acf.variationer_af_retten.variation_7.pris},- </p>` : ``}
        </div>
        <div class="variationContainer">
            ${snackData.acf.variationer_af_retten.variation_8.beskrivelse_af_retten ? `<p> - ${snackData.acf.variationer_af_retten.variation_8.beskrivelse_af_retten} ${snackData.acf.variationer_af_retten.diaet_praeference_8 ? `<i class="material-symbols-outlined">eco</i></p>` : ``}` : ``}
            ${snackData.acf.variationer_af_retten.variation_8.pris ? `<p>${snackData.acf.variationer_af_retten.variation_8.pris},- </p>` : ``}
        </div>
    </div>
        `;
    })
}

function getAllevents() {
    return fetch(baseUrl + `&categories=5`)
        .then((res) => res.json())
        .then((events) => {
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
                <img src="${event.acf.billede_af_begivenhed.sizes.medium}" loading="lazy">
            </picture>
        
            <div class="beskrivelseEvent">
                <div>
                    <h4>${event.acf.titel_pa_begivenhed}</h4>
                    <p>${event.acf.beskrivelse_af_begivenhed}</p>
                </div>
                <div class="infoEvent">

                    <div class="infoEnhed">
                        <i class="material-symbols-outlined">credit_card
                        <p>${event.acf.pris},-</p></i>
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
        </div>  
        
    `
    });
}

// Burgermenu:
// tilføjer en event listener til burgerMenu-ikonet, der lytter efter et klik
burgerMenu.addEventListener('click', () => {
    logoUllaEl.classList.toggle('hidden');
    navMobil.classList.toggle('showNav');
    navMobil.classList.toggle('navMobil');

    // Tilføj eller fjern overFlowHidden-klassen fra body som gør at man ikke kan scrolle
    body.classList.toggle('overFlowHidden');
});

//tilføjer en eventlistener til hele dokumentet der skal reagere på et klik
document.addEventListener('click', function (event) {
    //tjekker om der bliver trykket uden for mobilNav og at det ikke er burgerMenu ikonet der bliver trykket på
    if (!navMobil.contains(event.target) && event.target !== burgerMenu) {
        // Fjerner shownav så menuen bliver gemt væk og tilføjer mobilnav igen
        navMobil.classList.remove('showNav');
        navMobil.classList.add('navMobil');
    }
});