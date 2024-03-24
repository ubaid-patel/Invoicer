import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoidWJhaWRwYXRlbDU5NSIsImEiOiJjbHU1ZGFxczYwdmZpMmpuNHljZHlibnB6In0.zMVbPdsglTT36MyuHzTfHQ';

const Map = () => {
  useEffect(() => {
    // Initialize map
    const map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [77.5946, 12.9716], // starting position [lng, lat]
      zoom: 9, // starting zoom,
      // interactive:false,
      attributionControl: false,
    });

    // Add navigation control (optional)
    map.addControl(new mapboxgl.NavigationControl());

    // Create an array of markers
    const markers = [
      {
        name: 'Pickup',
        coordinates: [77.64998,12.92141], // Example coordinates for pickup location
        iconUrl: 'pick.png' // URL to pickup pin icon
      },
      {
        name: 'Drop',
        coordinates: [77.70653,12.97711], // Example coordinates for drop-off location
        iconUrl: 'drop.png', // URL to drop-off pin icon,
      }
    ];

    // Add markers to the map
    markers.forEach(marker => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(${marker.iconUrl})`; // Set background image for pin icon
      el.style.width = '28px'; // Set width of pin icon
      el.style.height = '40px'; // Set height of pin icon
      el.style.transform = 'rotate(20deg)';
      el.style.backgroundSize = 'cover'; // Ensure pin icon fits container
      

      new mapboxgl.Marker(el)
        .setLngLat(marker.coordinates)
        .addTo(map);
    });

    // Fetch route between pickup and drop-off locations
    fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${markers[0].coordinates[0]},${markers[0].coordinates[1]};${markers[1].coordinates[0]},${markers[1].coordinates[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`)
      .then(response => response.json())
      .then(data => {
        // Add route to map
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: data.routes[0].geometry
            }
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#a8a67b',
            'line-width':5
          }
        });

      }).catch(error => console.error('Error fetching route:', error));

    // Clean up
    return () => map.remove();
  }, []); // Only run this effect once, on component mount

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default Map;