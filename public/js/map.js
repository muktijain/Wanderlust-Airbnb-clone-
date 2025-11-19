mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',   // REQUIRED
    center: [-74.5, 40],
    zoom: 9
});


// document.addEventListener("DOMContentLoaded", function () {
    
    
//     mapboxgl.accessToken = window.mapToken; 

//     const map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox',
//         center: coordinates,
//         zoom: 10 
//     });

//     map.addControl(new mapboxgl.NavigationControl());

//     const marker = new mapboxgl.Marker({ color: "red" })
//         .setLngLat(coordinates) 
//         .setPopup(
//             new mapboxgl.Popup({ offset: 25 })
//             .setHTML(`<h6>Exact location provided after booking</h6>`) 
//         )
//         .addTo(map); 
// });