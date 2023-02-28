// Store our API endpoint inside url

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function popUpMsg(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" +
      new Date(feature.properties.time) + "</p><p>Magnitude: " + feature.properties.mag + "</p>" +
      "Depth: " + feature.geometry.coordinates[2] + " km");
  };
  
  


  function circleSize(feature){
    radius = feature.properties.mag
    return radius*5;
  };

  function circleColor(feature){
    depth = feature.geometry.coordinates[2]
    if (depth < 10){
      color = "#ffffcc"
    }
    else if (depth <30){
      color = "#c7e9b4"
    }
    else if (depth <50){
      color = "#7fcdbb"
    }
    else if (depth <70){
      color = "#41b6c4"
    }
    else if (depth <90){
      color = "#2c7fb8"
    }
    else {
      color = "#253494"
    }
    return color
  };


 // Define streetmap and darkmap layers
 let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    maxZoom: 18
  });

  // Define a baseMaps object to hold our base layers
  let baseMaps = {
    "Street Map": streetmap,
    "Topographic Map": topo
  };
  
// Create our map, giving it the streetmap and earthquakes layers to display on load
let myMap = L.map("map", {
    center: [ 37.09, -95.71 ],
    zoom: 3,
    layers: [streetmap]     //default selected layer
    });

// Add streetmap tile to map
streetmap.addTo(myMap);



// create layer; will attach data later on
let earthquakes = new L.LayerGroup();
// Alternate method below and same as above
// let earthquakes = L.layerGroup();

// Create overlay object to hold our overlay layer
let overlayMaps = {
  Earthquakes: earthquakes
};

// Create a layer control
// Pass in our baseMaps and overlayMaps

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(url).then(function(data) {

  // Once we get a response, send the data.features object to the createFeatures function

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  L.geoJSON(data, {
    onEachFeature: popUpMsg,
    pointToLayer: function(feature, latlong){
      return new L.CircleMarker(latlong, {
        radius: circleSize(feature),
        fillOpacity: 0.7
      });
    },
    style: function(feature){
      return {color: circleColor(feature)}
    }
  }).addTo(earthquakes);

  earthquakes.addTo(myMap);

  // Create legend
  var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    var depthColors = [-10, 10, 30, 50, 70, 90];
    var labels = [];

    div.innerHTML += '<h4>Depth in Kilometers</h4>';

    // loop through depthColors and generate a label with a colored square for each interval
    for (var i = 0; i < depthColors.length; i++) {
        div.innerHTML +=
            '<i style="background:' + circleColor({geometry: {coordinates: [0, 0, depthColors[i]]}}) + '"></i> ' +
            depthColors[i] + (depthColors[i + 1] ? '&ndash;' + depthColors[i + 1] + ' km<br>' : '+ km');
    }

    div.innerHTML = '<div style="background-color: white; padding: 5px; border: 1px solid black;">' + div.innerHTML + '</div>';

    return div;
};

legend.addTo(myMap);
  
});
