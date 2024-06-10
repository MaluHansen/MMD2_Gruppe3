const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts"


let variationData;

const menuCardEL = document.querySelector(".soedesagerEnhed")
console.log(`menuCardEL:`, menuCardEL)

//function som henter data fra API. 
function getAllvariations() {
    //henter data igennem fetch (anvender baseurl og ACF wordpress category)
    return fetch(baseUrl + `?type-af-maltid=27`)
        //Converter data fra javascript til Json
        .then((res) => res.json())
        //Json dataen er assigned til variations og er derefter returned.
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


getAllvariations()
    .then(variations => showAllvariations(menuCardEL, variations))





//         <picture>
//                 <source media="(min-width: 600px)" srcset="${event.acf.billede_af_begivenhed.sizes.large}">
//                 <img src="${event.acf.billede_af_begivenhed.sizes.medium loading="lazy">
//             </picture>
//         <picture></picture>
//         <h4>${event.acf.titel_pa_begivenhed}</h4>
//         <p>${event.acf.beskrivelse_af_begivenhed}</p>
//         <i class="eventCardpris">${event.acf.pris}</i>
//         <i class="eventCardtid">${event.acf.starttidspunkt}</i>
//         <i class="eventCarddato">${event.acf.dato_for_begivenhed}</i>
//     `
// }

// getAllvariations()
//     .then(variationer => showAllvariations(eventCardEL, events))