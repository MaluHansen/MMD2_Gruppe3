//accestokcen fra mapbox, gør det muligt at få vist et kort
mapboxgl.accessToken = 'pk.eyJ1IjoibWFsb3VoYW5zZW4iLCJhIjoiY2x4M2ljczMzMDB4dzJqc2ExMXVsYjhtcSJ9.I8md3lEplng84HY746hppA';

//opretter en var som indeholder kortet igennem Mapbox.
//alt dato om kortet, fx. style, og positionen bliver vist i den container der har id=kort
var kort = new mapboxgl.Map({
  container: "kort",
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [9.904599910273452, 57.0536357530417],
  zoom: 14
});

//laver en markøre der plaeres på kortet ud fra de kordinater den får
const lokation = new mapboxgl.Marker({ color: '#933E65'})
        .setLngLat([9.904599910273452, 57.0536357530417])
        .addTo(kort);