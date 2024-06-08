// Variabler

const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100"

const morgenretterEl = document.querySelector(".morgenretter");
const brunchretterEl = document.querySelector(".brunchretter");
const spinnerEl = document.querySelector(".spinner");
const burgerEl = document.querySelector(".burger");



// spinnerEl.classList.add("show"); // Tilføj klassen "show" til spinnerEl
// burgerEl.classList.add("show"); // Tilføj klassen "show" til burgerEl
// wineGlassEl.classList.add("show"); // Tilføj klassen "show" til wineGlassEl

// https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100&type-af-maltid=(Indsat Id)


// Funktion til at hente data fra Wordpress API'en
function fetchFood(id) {
    fetch(baseUrl + `&type-af-maltid=` + id)
    .then(res => res.json())
    .then(data => showData(data))
    .catch(err => console.log("Fejl! Der er desværre sket en fejl.. Vi undskylder mange gange", err));
    console.log(baseUrl + `&type-af-maltid=` + id)
}

// kalder funktionen fetchFood med id'et 23
fetchFood(23);
// kalder funktionen fetchFood med id'et 22
fetchFood(22);



function showData(data) {
    console.log(data);
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
        <div class="enhed">
            <div class="titelOgPris">
                <p class="title">${morgenData.acf.navn_pa_ret} ${morgenData.diaet_praeference.length > 0 ? `<i class="material-symbols-outlined">eco</i>` : ``}</p>
                <p>${morgenData.acf.pris}</p>
            </div>
        ${morgenData.acf.detaljer_om_retten ? `<p class="beskrivelse">${morgenData.acf.detaljer_om_retten}</p>` : ``}
        </div>
        `;
    })
}


// DOM manipulation 