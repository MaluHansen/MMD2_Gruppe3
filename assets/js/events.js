const eventCardEL = document.querySelector(".eventCardcontainer")


getAllevents()
    .then(events => showAllevents(eventCardEL, events))







