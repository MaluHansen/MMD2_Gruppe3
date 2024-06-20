let languageSelector = document.querySelector('.languageSelector');
let languageDropdown = document.querySelector('.languageDropdown');
let languageOptionDA = document.querySelector('#lang-da');
let languageOptionEN = document.querySelector('#lang-en');

// Function der viser dropdown menuen når der hoveres over classen og skjuler den når der ikke længere hoveres over classen
languageSelector.addEventListener('mouseover', function() {
    if (languageDropdown.style.display == 'block') {
        languageDropdown.style.display = 'none';
    } else
    languageDropdown.style.display = 'block';
});


// languageOptionDA.addEventListener('click', function() {
//     document.getElementById('text1').innerText = 'Velkommen til vores hjemmeside!';
//     document.getElementById('text2').innerText = 'Dette er en dansk tekst.';
// });

// languageOptionEN.addEventListener('click', function() {

// });
