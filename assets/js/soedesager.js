const menuCardEL = document.querySelector(".soedesagerEnhed")

getAllvariations(27)
    .then(variations => showAllvariations(menuCardEL, variations));
