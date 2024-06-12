const menuCardEL = document.querySelector(".aftenEnhed")

getAllvariations(26)
    .then(variations => showAllvariationsForEvening(menuCardEL, variations))  