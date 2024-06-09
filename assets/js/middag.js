// Variabler

const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100"

const middagsmenuEl = document.querySelector(".middagsretter");
const snacksEl = document.querySelector(".snackretter");

// --- MIDDAGSRETTER ---
// Funktion til at hente data fra Wordpress API'en
function fetchMiddagsdata() {
    fetch(baseUrl + `&type-af-maltid=` + 24)
        .then(res => res.json())
        .then(data => showMiddagsData(data))
        .catch(err => console.log("Fejl! Der er desværre sket en fejl.. Vi undskylder mange gange", err));
}
console.log(baseUrl + `&type-af-maltid=` + 24);

fetchMiddagsdata();

// Funktion til at vise data i HTML'en
function showMiddagsData(data) {
    middagsmenuEl.innerHTML += `
    `;

    // forEach loop til at loope igennem dataen fra Wordpress, og indsætte det i HTML'en vha. innerHTML
    data.forEach(function (middagsData) {
        middagsmenuEl.innerHTML += `
        <div class="titel">
        <p class="title">${middagsData.acf.navn_pa_ret}</p>
        </div>
        <div class="detaljerOgSupplerende">
        ${middagsData.acf.detaljer_om_retten ? `<p class="beskrivelse">${middagsData.acf.detaljer_om_retten}</p>` : ``}
        </div>
        <div class="pris">
        <p>${middagsData.acf.pris}</p>
        </div>
        <div class="variationer">
        ${middagsData.acf.variationer_af_retten.variation_1.beskrivelse_af_retten ? `<p class="beskrivelse">${middagsData.acf.variationer_af_retten.variation_1.beskrivelse_af_retten}</p>` : ``}
        ${middagsData.acf.variationer_af_retten.variation_1.pris ? `<p class="beskrivelse">${middagsData.acf.variationer_af_retten.variation_1.pris} ,- </p>` : ``}
        ${middagsData.acf.variationer_af_retten.diaet_praeference_1 ? `<p class="beskrivelse"><i class="material-symbols-outlined">eco</i></p>` : ``}

  
        ${middagsData.acf.variationer_af_retten.variation_2.beskrivelse_af_retten ? `<p class="beskrivelse">${middagsData.acf.variationer_af_retten.variation_2.beskrivelse_af_retten}</p>` : ``}
        ${middagsData.acf.variationer_af_retten.variation_2.pris ? `<p class="beskrivelse">${middagsData.acf.variationer_af_retten.variation_2.pris} ,- </p>` : ``}
        ${middagsData.acf.variationer_af_retten.diaet_praeference_2 ? `<p class="beskrivelse"><i class="material-symbols-outlined">eco</i></p>` : ``}

        ${middagsData.acf.variationer_af_retten.variation_3.beskrivelse_af_retten ? `<p class="beskrivelse">${middagsData.acf.variationer_af_retten.variation_3.beskrivelse_af_retten}</p>` : ``}
        ${middagsData.acf.variationer_af_retten.variation_3.pris ? `<p class="beskrivelse">${middagsData.acf.variationer_af_retten.variation_3.pris} ,- </p>` : ``}
        ${middagsData.acf.variationer_af_retten.diaet_praeference_3 ? `<p class="beskrivelse"><i class="material-symbols-outlined">eco</i></p>` : ``}

        ${middagsData.acf.variationer_af_retten.variation_4.beskrivelse_af_retten ? `<p class="beskrivelse">${middagsData.acf.variationer_af_retten.variation_4.beskrivelse_af_retten}</p>` : ``}
        ${middagsData.acf.variationer_af_retten.variation_4.pris ? `<p class="beskrivelse">${middagsData.acf.variationer_af_retten.variation_4.pris} ,- </p>` : ``}
        ${middagsData.acf.variationer_af_retten.diaet_praeference_1 ? `<p class="beskrivelse"><i class="material-symbols-outlined">eco</i></p>` : ``}

        ${middagsData.acf.variationer_af_retten.variation_5.beskrivelse_af_retten ? `<p class="beskrivelse">${middagsData.acf.variationer_af_retten.variation_5.beskrivelse_af_retten}</p>` : ``}
        ${middagsData.acf.variationer_af_retten.variation_5.pris ? `<p class="beskrivelse">${middagsData.acf.variationer_af_retten.variation_5.pris} ,- </p>` : ``}
        ${middagsData.acf.variationer_af_retten.diaet_praeference_5 ? `<p class="beskrivelse"><i class="material-symbols-outlined">eco</i></p>` : ``}

        ${middagsData.acf.variationer_af_retten.variation_6.beskrivelse_af_retten ? `<p class="beskrivelse">${middagsData.acf.variationer_af_retten.variation_6.beskrivelse_af_retten}</p>` : ``}
        ${middagsData.acf.variationer_af_retten.variation_6.pris ? `<p class="beskrivelse">${middagsData.acf.variationer_af_retten.variation_6.pris} ,- </p>` : ``}
        ${middagsData.acf.variationer_af_retten.diaet_praeference_6 ? `<p class="beskrivelse"><i class="material-symbols-outlined">eco</i></p>` : ``}

        ${middagsData.acf.variationer_af_retten.variation_7.beskrivelse_af_retten ? `<p class="beskrivelse">${middagsData.acf.variationer_af_retten.variation_7.beskrivelse_af_retten}</p>` : ``}
        ${middagsData.acf.variationer_af_retten.variation_7.pris ? `<p class="beskrivelse">${middagsData.acf.variationer_af_retten.variation_7.pris} ,- </p>` : ``}
        ${middagsData.acf.variationer_af_retten.diaet_praeference_7 ? `<p class="beskrivelse"><i class="material-symbols-outlined">eco</i></p>` : ``}

        ${middagsData.acf.variationer_af_retten.variation_8.beskrivelse_af_retten ? `<p class="beskrivelse">${middagsData.acf.variationer_af_retten.variation_8.beskrivelse_af_retten}</p>` : ``}
        ${middagsData.acf.variationer_af_retten.variation_8.pris ? `<p class="beskrivelse">${middagsData.acf.variationer_af_retten.variation_8.pris} ,- </p>` : ``}
        ${middagsData.acf.variationer_af_retten.diaet_praeference_8 ? `<p class="beskrivelse"><i class="material-symbols-outlined">eco</i></p>` : ``}
        </div>
        `;
    })
}

// --- SNACK RETTER ---
// Funktion til at hente data fra Wordpress API'en
function fetchSnackdata() {
    fetch(baseUrl + `&type-af-maltid=` + 25)
        .then(res => res.json())
        .then(data => showSnackData(data))
        .catch(err => console.log("Fejl! Der er desværre sket en fejl.. Vi undskylder mange gange", err));
}

fetchSnackdata();

// Funktion til at vise data i HTML'en
function showSnackData(data) {
    snacksEl.innerHTML += `
    `;

    data.forEach(function (snackData) {
        snacksEl.innerHTML += `
        <div class="titel">
        <p class="title">${snackData.acf.navn_pa_ret}</p>
        </div>
        <div class="pris">
        <p>${snackData.acf.pris},- </p>
        </div>
        <div class="VariationerAfRetten">
            ${snackData.acf.variationer_af_retten.variation_1.beskrivelse_af_retten ? `<p class="beskrivelse">${snackData.acf.variationer_af_retten.variation_1.beskrivelse_af_retten}</p>` : ``}
            ${snackData.acf.variationer_af_retten.variation_2.beskrivelse_af_retten ? `<p class="beskrivelse">${snackData.acf.variationer_af_retten.variation_2.beskrivelse_af_retten}</p>` : ``}
            ${snackData.acf.variationer_af_retten.variation_3.beskrivelse_af_retten ? `<p class="beskrivelse">${snackData.acf.variationer_af_retten.variation_3.beskrivelse_af_retten}</p>` : ``}
            ${snackData.acf.variationer_af_retten.variation_4.beskrivelse_af_retten ? `<p class="beskrivelse">${snackData.acf.variationer_af_retten.variation_4.beskrivelse_af_retten}</p>` : ``}
            ${snackData.acf.variationer_af_retten.variation_5.beskrivelse_af_retten ? `<p class="beskrivelse">${snackData.acf.variationer_af_retten.variation_5.beskrivelse_af_retten}</p>` : ``}
            ${snackData.acf.variationer_af_retten.variation_6.beskrivelse_af_retten ? `<p class="beskrivelse">${snackData.acf.variationer_af_retten.variation_6.beskrivelse_af_retten}</p>` : ``}
            ${snackData.acf.variationer_af_retten.variation_7.beskrivelse_af_retten ? `<p class="beskrivelse">${snackData.acf.variationer_af_retten.variation_7.beskrivelse_af_retten}</p>` : ``}
            ${snackData.acf.variationer_af_retten.variation_8.beskrivelse_af_retten ? `<p class="beskrivelse">${snackData.acf.variationer_af_retten.variation_8.beskrivelse_af_retten}</p>` : ``}   
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

