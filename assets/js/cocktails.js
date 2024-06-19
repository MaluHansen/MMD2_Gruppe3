const cocktailVarianterEl = document.querySelector(".cocktailVarianter");
const kanderVarianterEl = document.querySelector(".kanderVarianter");

getPostsByID(`&type-af-drikkevarer=`, 33)
    .then(data => renderDrinksWithAnyPrice(cocktailVarianterEl, data));