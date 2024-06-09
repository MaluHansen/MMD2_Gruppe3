// Vi sætter en eventlistener til at lytte efter om alt vores content er indlæst på siden før funktionen skal sættes igang.
document.addEventListener('DOMContentLoaded', function () {
    // Fanger vores element i html.
    const animationsContainerEl = document.querySelector('.animationsContainer');

    // Tjek om animationen allerede er blevet vist i denne session ved at hente tagget i sessionStorage
    const hasAnimationPlayed = sessionStorage.getItem('hasAnimationPlayed');
    // Hvis ikke den er blevet vist så udfør denne handling. 
    if (!hasAnimationPlayed) {

        // Start animationen efter en kort forsinkelse
        setTimeout(() => {
            // Tilføj klassen split
            animationsContainerEl.classList.add('split');
            // Forsinkelse før animationen starter
        }, 1500);

        // Venter på animationen er færdig og gør følgende
        setTimeout(() => {
            // Tillad at man kan scrolle efter animationen er færdig. 
            document.body.style.overflow = 'auto';
            // Ændrer z-index så vores animation kommer til at ligge bagest
            animationsContainerEl.style.zIndex = '-1';
            // Gem information om, at animationen er blevet vist i sessionsStorage
            sessionStorage.setItem('hasAnimationPlayed', 'true');
            // Fjern vores animation
            animationsContainerEl.remove();
            // Timer til at matche animationens varighed + lidt ekstra tid
        }, 2500);

        // Hvis animation har været afspillet før
    } else {
        // Skjul containeren med det samme
        animationsContainerEl.style.display = 'none';
        // Tillad scrolling
        document.body.style.overflow = 'auto';
    }
});


