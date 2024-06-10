const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts"


let variationData;

const menuCardEL = document.querySelector(".aftenEnhed")
console.log(`menuCardEL:`, menuCardEL)


function getAllvariations() {
    return fetch(baseUrl + `?type-af-maltid=26`)
        .then((res) => res.json())
        .then((variations) => {
            variationData = variations;
            console.log('variationData:', variationData)
            return (variations);
        })
        .catch(err => console.log("Fejl", err));
}

function showAllvariations(containerToFill, variations) {
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


getAllvariations()
    .then(variations => showAllvariations(menuCardEL, variations))  