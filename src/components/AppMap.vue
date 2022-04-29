<template>
<div class="text-center">
<h3>Location our shop: Poland, Krakow, street Rakowicka 27 is present at below map.</h3>
  <div style="height: 100%; width: 100%">
    <l-map
      class="ma-auto col-12"
      style="min-height: 700px; height: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"

    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker v-if="marker" :lat-lng="marker" ><l-popup>You are here</l-popup></l-marker>
      <l-marker :lat-lng="markerLatLng"><l-popup>Here is our bookstore!</l-popup></l-marker>
      
    </l-map>
  </div>
    </div>
</template>
<script>
import { Icon } from 'leaflet';
import { LMap, LTileLayer, LMarker,LPopup } from 'vue2-leaflet';

export default {
  name: 'MapComponent',
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 10,
      center: [50.06988997898041, 19.955011147403724],
      bounds: null,
      marker: null,
      markerLatLng: [50.06988997898041, 19.955011147403724] 
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
    addMarker(event) {
      console.log(event);
      this.marker = event.latlng;
      this.$emit('newLocation', event.latlng);
    },
  },
  mounted() {
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.addMarker({
          latlng: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        });
        this.center = [pos.coords.latitude, pos.coords.longitude];
      },
      null,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
};
</script>

<style>
#mapid {
  height: 180px;
}
</style>
