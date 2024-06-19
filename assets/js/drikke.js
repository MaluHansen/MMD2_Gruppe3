const juiceVarianterEl = document.querySelector(".juiceVarianter");
const saftVarianterEl = document.querySelector(".saftVarianter");
const kaffeVarianterEl = document.querySelector(".kaffeVarianter");
const ovrigeVarianterEl = document.querySelector(".ovrigeVarianter");

getPostsByID(`&type-af-drikkevarer=`, 29)
    .then(data => renderDrinksWithAnyPrice(juiceVarianterEl, data));

getPostsByID(`&type-af-drikkevarer=`, 30)
    .then(data => renderDrinksWithAnyPrice(saftVarianterEl, data));

getPostsByID(`&type-af-drikkevarer=`, 31)
    .then(data => renderDrinksWithAnyPrice(kaffeVarianterEl, data));

getPostsByID(`&type-af-drikkevarer=`, 32)
    .then(data => renderDrinksWithAnyPrice(ovrigeVarianterEl, data));