const eventCardEL = document.querySelector(".eventCardcontainer")


getPostsByID(`&categories=`, 5)
    .then(data => showAllevents(eventCardEL, data))







