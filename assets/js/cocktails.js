const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100"
const cocktailEl = document.querySelector(".cocktails")
const kanderEl = document.querySelector(".kander")


let cocktailData;

function getCocktailsByID(Id) {
    return fetch(baseUrl + `&type-af-drikkevarer=` + Id)
        .then((res) => res.json())
        .then((cocktails) => {
            cocktailData = cocktails;
            return (cocktails);
        })
        .catch(err => console.log("Fejl", err));
}

function renderCocktails(containerToFill, cocktails) {
    cocktails.forEach(drink => {
        containerToFill.innerHTML += `<div class="cocktailEnhed">
        <div class="titelOgPris">
            <p>${drink.acf.navn_pa_drik}</p>
            <p>${drink.acf.pris_pr_glas},-</p>
        </div>
        <p class="cocktailBeskrivelse">${drink.acf.detaljerbeskrivelse_om_drikkevaren}</p>
    </div>
    `
    });
}

function renderKander(containerToFill, kander) {
    kander.forEach(drink => {
        containerToFill.innerHTML += `<div class="kandeEnhed">
        <div class="titelOgPris">
            <p>${drink.acf.navn_pa_drik}</p>
            <p>${drink.acf.pris_for_stor_storrelse},-</p>
        </div>
        <p class="kandeBeskrivelse">${drink.acf.detaljerbeskrivelse_om_drikkevaren}</p>
    </div>
    `
    });
}

getCocktailsByID(33)
    .then(cocktails => renderCocktails(cocktailEl, cocktails))
    .catch(err => console.error("Fejl:", err));

getCocktailsByID(28)
    .then(kander => renderKander(kanderEl, kander))
    .catch(err => console.error("Fejl:", err));
