// Variabler
const middagsmenuEl = document.querySelector(".middagsretter");
const snacksEl = document.querySelector(".snackretter");

// --- MIDDAGSRETTER ---
getPostsByID(`&type-af-maltid=`, 24)
    .then(data => showMiddagsData(middagsmenuEl, data));


// --- SNACK RETTER ---

getPostsByID(`&type-af-maltid=`, 25)
    .then(data => showSnackData(snacksEl, data));

