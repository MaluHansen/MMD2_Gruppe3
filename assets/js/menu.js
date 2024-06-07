// ----- Variabler -----

const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts?per_page=100"

const menucardEls = document.querySelectorAll('.menuContainer');
const cardTitleEl = document.querySelector('h3');

// En variabel af et objekt.
// Objektet har keys/værdier der stammer fra "<id>'et i HTML'en. Objektet erklæres for at hente en value (et img) og bruge det i nedenstående eventlistener.
const backgroundImageMap = {
    "morgenMenu": "url('assets/img/tilMenukort/morgenmad.jpeg')",
    "middagMenu": "url('assets/img/tilMenukort/burger.jpeg')",
    "aftenMenu": "url('/assets/img/tilMenukort/aftensmad.jpeg')",
    "soedeSagerMenu": "url('/assets/img/tilMenukort/dessert.jpeg')",
    "cocktailMenu": "url('/assets/img/tilMenukort/cocktail.jpeg')",
    "drikkeMenu": "url('/assets/img/tilMenukort/kakao.jpeg')",
    "oelMenu": "url('/assets/img/tilMenukort/ol.jpeg')",
    "vinMenu": "url('/assets/img/tilMenukort/vin1.jpeg')",

}

// ------ Eventlisteners ------

// Vi laver en eventlistener der har til formål at tilføje styling til elementet, når musen hover over elementet. 
// Da der er tale om en liste af elementer, anvendes en forEach-loop til at tilføje eventlisteneren til hvert element i listen.
menucardEls.forEach (menucardEl => {
    menucardEl.addEventListener("mouseover", e => {
// Vi opretter en variabel kaldet "elementId" og tildeler den id'et fra det element, der er blevet klikket på.
        let elementId = e.target.id;
// Vi tilføjer styling til elementet + og tilføjer en string defineret i variablen "backgroundImageMap".
        e.target.style.backgroundImage = 'linear-gradient(rgba(239, 165, 198, 0.5), rgba(239, 165, 198, 0.5)), ' + backgroundImageMap[elementId];
        e.target.style.color = 'rgba(253, 243, 130, 1)';
    });
// Vi laver en eventlistener der har til formål at fjerne stylingen fra elementet, når musen ikke længere hover over elementet.
        menucardEl.addEventListener("mouseout", e => {
        if (cardTitleEl) {
            e.target.style.color = '';
        }
        e.target.style.backgroundImage = '';
    });
});

