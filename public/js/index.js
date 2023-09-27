let map;
let markers = [];

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 34.397, lng: -111.644 },
    zoom: 6,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  });

  google.maps.event.addListener(map, "click", function (event) {
    placeMarker(map, event.latLng);
  });

  function placeMarker(map, location) {
    if (!marker) {
      var marker = new google.maps.Marker({
        id: "new",
        position: location,
        map: map,
      });
      var infowindow = new google.maps.InfoWindow({
        icon: './pics/forest.jpeg',
      });
      infowindow.open(map, marker);
    }
  }
}

initMap();
