const baseUrl ="https://ullat.marianoergaard.dk/wp-json/wp/v2/posts"


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
                <p class="aftenMenutitle">${variation.acf.navn_pa_ret} ${variation.acf.detaljer_om_retten}${variation.acf.diaet_praeference}</p>
                <p class="aftenMenupris">${variation.acf.pris}</p>
            </div>
        </div>
        `;
    });}
       

getAllvariations()
    .then(variations => showAllvariations(menuCardEL, variations))  