// Variabler
const morgenretterEl = document.querySelector(".morgenretter");
const brunchretterEl = document.querySelector(".brunchretter");

// --- MORGENRETTER ---
getPostsByID(`&type-af-maltid=`, 23)
    .then(data => showAllCoursesWithDescribtion(morgenretterEl, data));

// --- BRUNCH RETTER ---
getPostsByID(`&type-af-maltid=`, 22)
    .then(data => showBrunchData(brunchretterEl, data));