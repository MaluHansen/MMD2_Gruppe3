document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');

    // Tjek om animationen allerede er blevet vist i denne session
    const hasAnimationPlayed = sessionStorage.getItem('hasAnimationPlayed');
    if (!hasAnimationPlayed) {

        // Start animationen efter en kort forsinkelse
        setTimeout(() => {
            container.classList.add('split');
        }, 500); // Forsinkelse for at starte animationen

        // Vent på animationen er færdig
        setTimeout(() => {
            document.body.style.overflow = 'auto'; // Tillad scrolling efter animationen
            document.documentElement.style.overflow = 'auto'; // Sikre at <html> også tillader scrolling
            container.style.zIndex = '-1'; // Ændrer z-index til at ligge bagest
            // Gem information om, at animationen er blevet vist
            sessionStorage.setItem('hasAnimationPlayed', 'true');
            container.remove();
        }, 1500); // Timer til at matche animationens varighed + lidt ekstra tid


    } else {
        // Hvis animationen allerede er blevet vist, skjul containeren med det samme
        container.style.display = 'none'; // Skjul containeren
        document.body.style.overflow = 'auto'; // Tillad scrolling
        document.documentElement.style.overflow = 'auto'; // Sikre at <html> også tillader scrolling
    }
});


