let variationData;

const menuCardEL = document.querySelector(".aftenEnhed")
console.log(`menuCardEL:`, menuCardEL)

getAllvariations(26)
    .then(variations => showAllvariationsForEvening(menuCardEL, variations))  