const MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
  this.markers = [];
}

MapWrapper.prototype.addMarker = function(coords){
  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  })
  return marker;
}

MapWrapper.prototype.addInfoWindow = function(marker, text) {
  const info = new google.maps.InfoWindow({
    content: text
  });
  marker.addListener("click", function(){
    info.open(this, marker);
  });
}

MapWrapper.prototype.goToPlace = function(coords){
  this.googleMap.setCenter(coords);
};
