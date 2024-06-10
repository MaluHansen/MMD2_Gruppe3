// Vi har anvendt mapbox's api til at få indlæst et kort over aalborg. Vi har brugt følgende dokumentation (https://docs.mapbox.com/mapbox-gl-js/api/map/)


//For at få vist vores map fra mapbox skal der anvendes en accessToken. Vi har derfor oprettet en profil og fået tilsendt vores token.
mapboxgl.accessToken = 'pk.eyJ1IjoibWFsb3VoYW5zZW4iLCJhIjoiY2x4M2ljczMzMDB4dzJqc2ExMXVsYjhtcSJ9.I8md3lEplng84HY746hppA';

//Opretter en variabel som indeholder et object der bruges til at sætte parametre for vores kort såsom styling og position.
let kort = new mapboxgl.Map({
  // Container inderholder et html element med id = kort
  container: "kort",
  // Style definere hvordan kortet skal se ud. Her ville det være muligt at vælge satelitbilleder eller i dette tilfælde som et standart rutekort.
  style: 'mapbox://styles/mapbox/streets-v11',
  // Center definere hvilket udsnit af verden vi ønsker at se på vores kort. Det består af bredde- og længdegrader. 
  center: [9.904599910273452, 57.0536357530417],
  // Zoom afgører hvor langt ind der skal være zoomet. 
  zoom: 14,
  // minZoom og MaxZoom afgør hvor meget brugeren skal kunne zoome ind eller ud. 
  minZoom: 14,
  maxZoom: 17
});

// Vi opretter en markør der plaeres på kortet ud fra de kordinater den får. Her markere vi Ulla Terkelsen London med farven mørkPink.
const lokation = new mapboxgl.Marker({ color: '#933E65' })
  .setLngLat([9.904599910273452, 57.0536357530417])
  .addTo(kort);