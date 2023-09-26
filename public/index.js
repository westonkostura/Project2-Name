let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 34.397, lng: -111.644 },
    zoom: 6,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false

    
  });

  // A marker with a with a URL pointing to a PNG.
const beachFlagImg = document.createElement("img");

beachFlagImg.src =
  "pics/forest.jpeg";

const beachFlagMarkerView = new google.maps.Marker({
  map,
  position: { lat: 37.434, lng: -122.082 },
  title: "A marker using a custom PNG Image",
  draggable: true,
  icon: {
    url: "pics/forest.jpeg",
    // size: new google.maps.Size(20,32)

  },

});
//end marker example

function createMarker(map, position, title) {
  class Marker {
    constructor() {
      this.marker = new google.maps.Marker({
        position: position,
        map: map,
        title: title
      });
    }

    // Add any additional methods or properties to the Marker class here

    // Example method to set the marker position
    setPosition(newPosition) {
      this.marker.setPosition(newPosition);
    }
  }

  return new Marker();
};

//addListener to pop up new pin window to upload pciture to pin
map.addListener('click', function() {

})

}
 
  
initMap();
