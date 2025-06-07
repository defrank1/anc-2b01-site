// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiZGVmcmFuazEiLCJhIjoiY2x1bHZ0OWJyMHlhdjJrcDFsZzlwc3ZxMSJ9.XD1OM3LMVn2qoX9QMqR5Vg';

// Initialize the map
const map = new mapboxgl.Map({
  container: 'map', // ID of the element in your HTML
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-77.042, 38.912], // approximate center of ANC 2B01
  zoom: 15
});

map.on('load', () => {
  // Load the full ANC 2022 GeoJSON from OpenANC GitHub
  map.addSource('ancs', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/devinbrady/openanc/main/data/anc_2022.geojson'
  });

  // Add the ANC boundaries layer but filter to only ANC 2B01
  map.addLayer({
    id: 'anc-2b01-fill',
    type: 'fill',
    source: 'ancs',
    paint: {
      'fill-color': '#0074D9',
      'fill-opacity': 0.3
    },
    filter: ['==', ['get', 'SMD_ID'], '2B01']
  });

  map.addLayer({
    id: 'anc-2b01-outline',
    type: 'line',
    source: 'ancs',
    paint: {
      'line-color': '#0074D9',
      'line-width': 2
    },
    filter: ['==', ['get', 'SMD_ID'], '2B01']
  });

  // Add zoom controls
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');
});
