const markerDiv = document.querySelector("#markers");
const saveButton = document.querySelector("#saveMap");
const MyMap = document.querySelector("#MyMap");
const refresh = document.querySelector("#startNewMap");

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

  //initalize placeMarker function on click on map
  google.maps.event.addListener(map, "click", function (event) {
    placeMarker(map, event.latLng);

    var newMarkerDiv = document.createElement("div");
    var newMarkerName = document.createElement("h4");
    var newMarkerPicture = document.createElement("input");

    newMarkerPicture.setAttribute("data-LatLong", event.latLng);
    newMarkerPicture.addEventListener("change", function (e) {
      console.log(e.target.value, e.target.getAttribute("data-LatLong"));
      
    });

    newMarkerName.textContent = `Marker ${markers.length}`;
    newMarkerName.setAttribute("contenteditable", "true");
    newMarkerPicture.innerText = "Upload Picture";
    newMarkerPicture.setAttribute("class", "btn btn-secondary btn-md");

    markerDiv.appendChild(newMarkerDiv);
    newMarkerDiv.appendChild(newMarkerName);
    newMarkerDiv.appendChild(newMarkerPicture);

    newMarkerDiv.style.border = "4px solid gray";
    newMarkerDiv.setAttribute("class", "col");

    newMarkerPicture.setAttribute("type", "file");
    newMarkerPicture.style.float = "right";
  });

  //function for creating new marker
  function placeMarker(map, location) {
    var marker = new google.maps.Marker({
      title: `Pin ${markers.length}`,
      position: location,
      map: map,
    });
    var infowindow = new google.maps.InfoWindow({
      content: "No Picture Uploaded yet!",
    });
    infowindow.open(map, marker);
    markers.push(marker);
    console.log(markers);

    //listener to open infoWindow on marker click
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
      });
    });
  }

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
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"


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

initMap();
