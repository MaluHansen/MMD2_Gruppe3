const menuCardEL = document.querySelector(".soedesagerEnhed")

getPostsByID(`&type-af-maltid=`, 27)
    .then(data => showAllvariationsOfSweets(menuCardEL, data));
