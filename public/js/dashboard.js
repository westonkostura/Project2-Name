const markerDiv = document.querySelector("#markers");
const saveButton = document.querySelector("#saveButton");
const MyMap = document.querySelector("#MyMap")

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
    var newMarkerPicture = document.createElement("button");

    newMarkerName.textContent = `Marker ${markers.length}`;
    newMarkerName.setAttribute("contenteditable", "true");
    newMarkerPicture.innerText = "Upload Picture";
    newMarkerPicture.setAttribute("class", "btn btn-secondary btn-md");

    markerDiv.appendChild(newMarkerDiv);
    newMarkerDiv.appendChild(newMarkerName);
    newMarkerDiv.appendChild(newMarkerPicture);

    newMarkerDiv.style.border = "4px solid gray";
    newMarkerDiv.setAttribute("class", "col");
    newMarkerPicture.style.float = "right";
  });

  //function for creating new marker
  function placeMarker(map, location) {
    var marker = new google.maps.Marker({
      title: `Pin ${markers.length}`,
      position: location,
      map: map,
    });
    console.log(position);
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

  MyMap.addEventListener("click", function() {

  })


}

initMap();
