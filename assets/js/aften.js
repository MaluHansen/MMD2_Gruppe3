const menuCardEL = document.querySelector(".aftenEnhed")

getPostsByID(`&type-af-maltid=`, 26)
    .then(data => showAllCoursesWithDescribtion(menuCardEL, data));
