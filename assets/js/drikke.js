const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100"
const juiceSmoothieEl = document.querySelector(".juiceSmoothie")
const saftSodavandEl = document.querySelector(".saftSodavand")
const kaffeTheKakaoEl = document.querySelector(".kaffeTheKakao")
const ovrigeDrikkeEl = document.querySelector(".ovrigeDrikke")



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

function renderdrink(containerToFill, drinks) {
    drinks.forEach(drink => {
        containerToFill.innerHTML += `<div class="drinkEnhed">
        <div class="titelOgPris">
            <p>${drink.acf.navn_pa_drik}</p>
            <p>${drink.acf.pris_pr_glas},-</p>
        </div>
    </div>
    `
    });
}


getDrinksByID(29)
    .then(drinks => renderdrink(juiceSmoothieEl, drinks))
    .catch(err => console.error("Fejl:", err));

getDrinksByID(30)
    .then(kander => renderdrink(saftSodavandEl, kander))
    .catch(err => console.error("Fejl:", err));

getDrinksByID(31)
    .then(cocktails => renderdrink(kaffeTheKakaoEl, cocktails))
    .catch(err => console.error("Fejl:", err));

getDrinksByID(32)
    .then(kander => renderdrink(ovrigeDrikkeEl, kander))
    .catch(err => console.error("Fejl:", err));