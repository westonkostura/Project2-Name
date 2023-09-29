const markerDiv = document.querySelector("#markers");
const saveButton = document.querySelector("#saveMap");
const MyMap = document.querySelector("#MyMap");
const refresh = document.querySelector("#startNewMap");
const createPin = document.querySelector("#createPin");
const pinForm = document.querySelector("#createPinForm");

let map;
let markers = [];

//initial map function
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 34.397, lng: -111.644 },
    zoom: 6,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  });

  //custom marker class
  class CustomMarker extends google.maps.Marker {
    constructor(options) {
      super(options);
    }

    getPosition() {
      return super.getPosition();
    }

    getTitle() {
      return super.getTitle();
    }
  }

  //initalize placeMarker function on click on map
  google.maps.event.addListener(map, "click", function (event) {
    //function for creating new marker
    function placeMarker(map, location) {
      var marker = new CustomMarker({
        title: `Pin ${markers.length}`,
        position: location,
        map: map,
      });
      var infowindow = new google.maps.InfoWindow({
        content: "No Picture Uploaded yet!",
      });
      infowindow.open(map, marker);
      markers.push(marker);
      console.log("placed markers", markers);

      //listener to open infoWindow on marker click
      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });

      return marker;
    }
    //placed marker from function
    var placedMarker = placeMarker(map, event.latLng);
    console.log(placedMarker);
  });

  


  //function to add markers on button click
  function addExampleMarkers() {
    // Array of coordinates for the points
    const points = [
      { lat: 35.5749, lng: -110.4194 },
      { lat: 33.7749, lng: -110.4316 },
      { lat: 32.7858, lng: -112.4064 },
      // Add more points as needed
    ];
    const images = [
      "/pics/vacationImage1.jpeg",
      "/pics/VacationImage2.jpeg",
      "/pics/VacationImage3.jpeg",
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    ];

    // Loop through the points array and add markers for each point
    points.forEach((point, i) => {
      new google.maps.Marker({
        position: point,
        map: map,
        icon: images[i],
      });
    });
  }

  //listener for addExampleMarkers function
  MyMap.addEventListener("click", async function () {
    addExampleMarkers();
  });
}

//refresh button
refresh.addEventListener("click", function () {
  location.reload();
});

//save map button
// saveButton.addEventListener("click", function () {
//   console.log("save button clicked");
//   console.log(markers);
//   //function to save markers to database
//   async function saveMarkers() {
//     const response = await fetch("/api/map", {
//       method: "POST",
//       body: JSON.stringify({ markers }),
//       headers: { "Content-Type": "application/json" },
//     });
//     console.log(response);
//     if (response.ok) {
//       document.location.replace("/dashboard");
//     } else {
//       alert(response.statusText);
//     }
//   }
//   saveMarkers();
// });

initMap();
