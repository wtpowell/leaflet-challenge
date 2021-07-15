// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id:"mapbox/light-v10",
  accessToken: API_KEY
}).addTo(myMap);


//define json variable source
var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


//read geojson with d3
d3.json(earthquake_url).then(function(response){
createFeatures(response.features);
});


//create marker for each earthquake in the json
function createFeatures(data) {
function onEachFeature (feature,layer) {
  var magnitude = feature.properties.mag
  var depth = feature.geometry.coordinates[2]
  var color = ""
  if (depth >= 90) {
    color = "#FF5135";
  }
  else if (depth < 90 && depth >=  70){
    color = "#FFF14B";
  }
  else if (depth < 70 && depth >= 50) {
    color = "#FF8E15";
  }
  else if (depth <50 && depth  >= 30){
    color = "#D1FF4B";
  }
  else if (depth < 30 && depth >= 10) {
    color = "#9CFF33";
  }
  else {
    color = "#61FF33";
  }

  var circlemarkers = []
  circlemarkers.push(
    L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
      fillOpacity:0.75,
      color:"black",
      weight: 0.5,
      fillColor:color,
      radius: magnitude * 5
    }).bindPopup("<h3>" + feature.properties.place +"<h3><hr><p>" + new Date(feature.properties.time) + "</p><hr><p> Magnitude: " + feature.properties.mag+"</p>").addTo(myMap));

}

var earthquake = L.geoJSON(data, {
  onEachFeature: onEachFeature
});
};
