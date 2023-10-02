const markerDiv = document.querySelector("#markers");
const saveButton = document.querySelector("#saveMap");
const MyMap = document.querySelector("#MyMap");
const refresh = document.querySelector("#startNewMap");
const createPin = document.querySelector("#createPin");
const createdPins = document.querySelector("#createdPins");
const createdMaps = document.querySelector("#createdMaps");
const pictureUpload = document.querySelector("#pictureUpload");

//form components
const pinForm = document.querySelector("#createPinForm");
const pinTitle = document.querySelector("#pinTitle");
const pinLocation = document.querySelector("#pinLocation");
const pinImage = document.querySelector("#pinImage");

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

  // add event listener for image form
  pictureUpload.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("picture upload form submitted");
  });

  // add event listener to pinForm
  pinForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // get form values
    const pinTitle = document.querySelector("#pinTitle").value;
    const search = document
      .querySelector("#pinLocation")
      .value.split(" ")
      .join("%20");

    // get coordinates from Geoapify API
    var requestOptions = {
      method: "GET",
    };
    var url = `https://api.geoapify.com/v1/geocode/search?text=${search}&apiKey=ef053a480d684eafa8e0588324270007`;
    console.log(url);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var coordinates = result.features[0].geometry.coordinates;
        console.log(coordinates);

        // create google maps marker with pinTitle and coordinates
        var marker = new google.maps.Marker({
          position: { lat: coordinates[1], lng: coordinates[0] },
          map: map,
          title: pinTitle,
        });
        // push marker to markers array
        markers.push({
          title: pinTitle,
          position: { lat: coordinates[1], lng: coordinates[0] },
        });

        console.log(markers);
// loop through markers array and create new div for newest marker
const newestMarkerIndex = markers.length - 1;
const newestMarker = markers[newestMarkerIndex];

// create new div element for newest marker
const createdMarkerdiv = document.createElement("div");
createdMarkerdiv.classList.add("marker");

// create new h3 element for newest marker title
const markerTitle = document.createElement("h3");
markerTitle.textContent = newestMarker.title;

// create new p element for newest marker location
const markerLocation = document.createElement("p");
markerLocation.textContent = `Lat: ${newestMarker.position.lat}, Lng: ${newestMarker.position.lng}`;

// append title and location to newest marker div
createdMarkerdiv.appendChild(markerTitle);
createdMarkerdiv.appendChild(markerLocation);

// append newest marker div to createdPins div
createdPins.appendChild(createdMarkerdiv);
      })
      .catch((error) => console.log("error", error));

    //reset form
    pinForm.reset();
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
        icon: {
          url: images[i],
          scaledSize: new google.maps.Size(50, 50),
        },
      });
    });
  }
  //listener for addExampleMarkers function
  MyMap.addEventListener("click", function () {
    addExampleMarkers();
  });

  //end initMap function
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
