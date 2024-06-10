// Variabler

const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100"

const morgenretterEl = document.querySelector(".morgenretter");
const brunchretterEl = document.querySelector(".brunchretter");


// --- MORGENRETTER ---
// Funktion til at hente data fra Wordpress API'en
function fetchMorgendata() {
    fetch(baseUrl + `&type-af-maltid=` + 23)
        .then(res => res.json())
        .then(data => showMorgenData(data))
        .catch(err => console.log("Fejl! Der er desværre sket en fejl.. Vi undskylder mange gange", err));
    console.log(baseUrl + `&type-af-maltid=` + 23)
}
fetchMorgendata();

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
fetchBrunchdata();

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