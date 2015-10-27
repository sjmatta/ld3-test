import L from 'imports?L=leaflet!exports?L!leaflet-d3-svg-overlay';
import _ from 'lodash';
import faker from 'faker';
import 'leaflet/dist/leaflet.css';
import './main.css';

const map = L.map('map').setView([38.89, -77.09], 4);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.Icon.Default.imagePath = 'http://api.tiles.mapbox.com/mapbox.js/v1.0.0beta0.0/images';

const data = _.times(1000, () => {
  return [faker.address.latitude(), faker.address.longitude()];
});

const d3Overlay = L.d3SvgOverlay((selection, projection) => {
  const updateSelection = selection.selectAll('circle').data(data);
  updateSelection.enter()
      .append('circle')
      .attr('r', 10)
      .attr('cx', d => projection.latLngToLayerPoint(d).x)
      .attr('cy', d => projection.latLngToLayerPoint(d).y)
      .attr('fill', 'red');
});

d3Overlay.addTo(map);
