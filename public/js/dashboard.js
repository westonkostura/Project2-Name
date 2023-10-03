const markerDiv = document.querySelector("#markers");
const saveButton = document.querySelector("#SaveMap");
const myMap = document.querySelector("#MyMap");
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

// add event listener for pictureUplaod
pictureUpload.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent default form submission behavior

  const formData = new FormData(pictureUpload);

  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        alert("File uploaded successfully");
      } else {
        alert("File upload failed");
      }
      console.log("File uploaded successfully");
      console.log(response);
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
      // handle the error
    });
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

      //created marker div
      // loop through markers array and create new div for newest marker
      const newestMarkerIndex = markers.length - 1;
      const newestMarker = markers[newestMarkerIndex];

      // create new div element for newest marker
      const createdMarkerdiv = document.createElement("div");
      createdMarkerdiv.style.border = "1px solid black";
      createdMarkerdiv.classList.add("marker");

      // create new h3 element for newest marker title
      const markerTitle = document.createElement("h3");
      markerTitle.textContent = pinTitle;

      // create new p element for newest marker location
      const markerLocation = document.createElement("p");
      markerLocation.textContent = `Lat: ${coordinates[1]}, Lng: ${coordinates[0]}`;

      // create new img element for newest marker image

      //**** this does not work current, keeps bringing null image */
      const markerImage = document.createElement("img");
      markerImage.style.width = "100%";
      markerImage.style.height = "100px";
      // fetch list of files in uploads directory
      fetch("/uploads")
        .then((response) => response.json())
        .then((data) => {
          // sort files by creation time
          data.files.sort((a, b) => {
            return new Date(b.created) - new Date(a.created);
          });

          // get filename of newest file
          const newestFile = data.files[0].filename;

          // set src attribute of markerImage element to URL of newest file
          markerImage.src = `/uploads/${newestFile}`;

          // append title, location, and image to newest marker div
          createdMarkerdiv.appendChild(markerTitle);
          createdMarkerdiv.appendChild(markerLocation);
          createdMarkerdiv.appendChild(markerImage);

          // append newest marker div to createdPins div
          createdPins.appendChild(createdMarkerdiv);

          // create google maps marker with pinTitle and coordinates
          var marker = new google.maps.Marker({
            position: { lat: coordinates[1], lng: coordinates[0] },
            map: map,
            title: pinTitle,
            icon: {
              url: markerImage.src,
              scaledSize: new google.maps.Size(50, 50), 
            }
          });
          // push marker to markers array
          markers.push({
            title: pinTitle,
            position: { lat: coordinates[1], lng: coordinates[0] },
            image: markerImage,
          });
        });

      console.log(markers);
    })
    .catch((error) => console.log("error", error));

  //reset form
  pinForm.reset();
});

// add event listener to saveButton
saveButton.addEventListener("click", function () {
  // create new array to store marker data
  const markerData = [];
  var mapName = window.prompt("Please enter a name for your map");

  // loop through markers array and push title and position to markerData array
  markers.forEach((markers) => {
    markerData.push({
      title: markers.title,
      position: markers.position,
      image: markers.image,
    });
  });
  console.log('big marker', markerData);
  console.log(JSON.stringify(markerData));
  fetch('/api/markers', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(markerData),
  })
  
  .then((response) => response.json())
  .then((markerData) => {
    console.log("Success in posting marker data:", markerData);
  })
  .catch((error) => {
    console.error("Error posting marker data:", error);
  });
  // make POST request to server to save marker data
  // async function saveMarkerData(markerData) {
  //   const response = await fetch("/api/markers", {
  //     method: "POST",
  //     body: JSON.stringify(markerData),
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   console.log(response);
  //   if (response.ok) {
  //     document.location.replace("/dashboard");
  //   } else {
  //     alert(response.statusText);
  //   }
  // }
  // saveMarkerData(markerData);

  myMap.addEventListener("click", function () {
    // call the function to render data
    getMarkerData();
  });

  // function to get marker data from server
  async function getMarkerData() {
    const response = await fetch("/api/markers");
    const data = await response.json();
    return data;
  }
    // still not working, need to figure out how to get the image to render
  //   markerData.forEach((markerData, i) => {
  //     new google.maps.Marker({
  //       position: markerData.position,
  //       map: map,
  //       image: markerData.image,
  //       title: markerData.title,
  //     });
  //   });
  // }
 });
// add event listener to myMap
// myMap.addEventListener("click", function () {
//   // call the function to render data
//   renderData();
// });

// function to render data
// function renderData() {
//   // still not working, need to figure out how to get the image to render
//   markerData.forEach((markerData, i) => {
//     new google.maps.Marker({
//       position: markerData.position,
//       map: map,
//       image: markerData.image,
//        title: markerData.title,
//     });
//   });
// }

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
