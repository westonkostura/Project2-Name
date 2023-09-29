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

    var placedMarker = placeMarker(map, event.latLng);
    console.log(placedMarker);

    var newMarkerDiv = document.createElement("div");
    var newMarkerName = document.createElement("h4");
    var newMarkerPictureForm = document.createElement("form");
    var newMarkerPictureFile = document.createElement("input");
    var newMarkerPictureButton = document.createElement("button");

    newMarkerPictureForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });

    newMarkerPictureForm.setAttribute("method", "POST");
    newMarkerPictureForm.setAttribute("action", "/profile-upload-single");
    newMarkerPictureForm.setAttribute("enctype", "multipart/form-data");

    newMarkerPictureFile.setAttribute("type", "file");
    newMarkerPictureFile.setAttribute("name", "uploaded_image");
    newMarkerPictureFile.required = true;

    newMarkerPictureButton.textContent = "Upload Picture";

    markerDiv.appendChild(newMarkerDiv);
    newMarkerDiv.appendChild(newMarkerName);
    newMarkerDiv.appendChild(newMarkerPictureForm);
    newMarkerPictureForm.appendChild(newMarkerPictureFile);
    newMarkerPictureForm.appendChild(newMarkerPictureButton);

    // Store the marker variable as a property of the newMarkerDiv element
    newMarkerDiv.dataset.marker = markers.indexOf(marker);

    
    newMarkerPictureFile.addEventListener("change", function (event) {
      var markerId = parseInt(newMarkerDiv.dataset.markerId);
      var marker = markers[markerId];
      marker.setMap(null);
      markers.splice(markerId, 1);
      markerDiv.removeChild(markerDiv.childNodes[markerId]);
    });

    markerDiv.addEventListener("click", function (event) {
      if (event.target.tagName === "BUTTON") {
        var markerId = parseInt(event.target.parentNode.dataset.markerId);
        var marker = markers[markerId];
        console.log(marker);
        // Do something with the marker object
      }
    });


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

initMap();
