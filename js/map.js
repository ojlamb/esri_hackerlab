var map = L.map('map').setView([45.533, -122.657], 12);
var layer = L.esri.basemapLayer('Topographic').addTo(map);


function myFunction(data) {
  map.setView([data.latitude, data.longitude], 18)
  var latlng = L.latLng(data.latitude, data.longitude);
  var marker = L.marker(latlng).addTo(map);
  marker.bindPopup("You are HERE!").openPopup();
};



map.locate();
map.on('locationfound', myFunction);


var layerLabels;

censusLayer = L.esri.Layers.featureLayer ({
    url: 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/1'
  }).addTo(map);

console.log(censusLayer);

censusLayer.setStyle({color: 'transparent'});



function setBasemap(basemap) {
  if (layer) {
    map.removeLayer(layer);
  }
  layer = L.esri.basemapLayer(basemap);
  map.addLayer(layer);
  if (layerLabels) {
    map.removeLayer(layerLabels);
  }

  if (basemap === 'ShadedRelief' || basemap === 'Oceans' || basemap === 'Gray' || basemap === 'DarkGray' || basemap === 'Imagery' || basemap === 'Terrain') {

    layerLabels = L.esri.basemapLayer(basemap + 'Labels');
    map.addLayer(layerLabels);
  }
}

  var basemaps = document.getElementById('basemaps');

  basemaps.addEventListener('change', function(){
    setBasemap(basemaps.value);
  });
