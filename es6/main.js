import L from 'leaflet';
import d3 from 'd3';
import async from 'async';
import faker from 'faker';
import 'leaflet/dist/leaflet.css';
import './main.css';

const map = L.map('map').setView([38.89, -77.09], 4);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.Icon.Default.imagePath = 'http://api.tiles.mapbox.com/mapbox.js/v1.0.0beta0.0/images';

// TODO: don't assume 0, 0; use map.pixelOrigin()
const mapSize = map.getSize();
const svgContainer = d3.select(map.getPanes().overlayPane).append('svg')
  .attr('width', mapSize.x)
  .attr('height', mapSize.y);
const g = svgContainer.append('g').attr('class', 'leaflet-zoom-hide');

async.times(1000, (n, callback) => {
  const latLng = [faker.address.latitude(), faker.address.longitude()];
  const layerPoint = map.latLngToLayerPoint(latLng);
  const circle = g.append('circle')
    .attr('cx', layerPoint.x)
    .attr('cy', layerPoint.y)
    .attr('r', 10)
    .attr('fill', 'red');
  callback(null, circle);
});
