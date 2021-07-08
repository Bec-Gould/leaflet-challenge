
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var colorScale = [
  "#ff6600", "#ff9900", "#ffcc00", "#fff00", "#66ff00", "#33ff00"
]

d3.json(url).then(response => {
  console.log(response);
  // json = response.json();

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  var SatelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  });

  var OutdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "outdoors-v11",
    accessToken: API_KEY
  });


  var myMap = L.map("map", {
    center: [37.77, -122.42],
    zoom: 3,
    layers: [darkmap]
  })


  var baseMaps = {
    "Dark Map": darkmap,
    "Satellite": SatelliteMap,
    "Outdoors": OutdoorsMap
  }


  L.geoJSON(response, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: +feature.properties.mag*3,
        fillColor: getFillColor(+feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: .33,
        fillOpacity: .66
      });
    }

  }).addTo(myMap);


  function getFillColor(depth) {
    if (depth > 90)
      return colorScale[0];
    if (depth > 70)
      return colorScale[1];
    if (depth > 50)
      return colorScale[2];
    if (depth > 30)
      return colorScale[3];
    if (depth > 10)
      return colorScale[4];
    return colorScale[5];
  }

  function onEachFeature(feature, layer) {
    var popUp = (
      `<h2>${feature.properties.place}</h2>`
    );
    layer.bindPopup(popUp);
  }


  L.control.layers(baseMaps).addTo(myMap);

});
