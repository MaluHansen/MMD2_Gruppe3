const baseUrl = "https://ullat.marianoergaard.dk/wp-json/wp/v2/posts"


let eventdata;

const eventCardEL = document.querySelector(".eventCardcontainer")
console.log(`eventCardEl:`, eventCardEL)


function getAllevents() {
    return fetch(baseUrl + `?categories=5`)
        .then((res) => res.json())
        .then((events) => {
            eventdata = events;
            console.log('eventdata:', eventdata)
            return (events);
        })
        .catch(err => console.log("Fejl", err));
}

function showAllevents(containerToFill, events) {
    events.forEach(event => {
        containerToFill.innerHTML += `
        
       <div class="eventCard"> 
         <picture>
         <source media="(min-width: 600px)" srcset="${event.acf.billede_af_begivenhed.sizes.large}">
          <img src="${event.acf.billede_af_begivenhed.sizes.medium} loading="lazy">
         </picture>
         <h4>${event.acf.titel_pa_begivenhed}</h4>
        <p>${event.acf.beskrivelse_af_begivenhed}</p>
        <div class="eventCardinfo">

            <div class="infoEnhed">
                <i class="material-symbols-outlined">credit_card
              <p>${event.acf.pris}</p></i>
         </div>
            <div class="infoEnhed">
              <i class="material-symbols-outlined">schedule
              <p>${event.acf.starttidspunkt}</p></i>
         </div>
         <div class="infoEnhed">
             <i class="material-symbols-outlined">calendar_month
             <p>${event.acf.dato_for_begivenhed}</p></i>
         </div>

        </div>
        </div>
        
    `
    });
}

getAllevents()
    .then(events => showAllevents(eventCardEL, events))




// function getAllevents(){
//     fetch(baseUrl + "?categories=5")
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     renderAllEvents()
//     .catch(err => console.log("der er sket en fejl" + err))
// }







