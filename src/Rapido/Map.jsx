import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import styles from '../CSS/map.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateDistance } from '../redux/mainSlice';

function getcenterpoint(latNlong) {
  return ([((latNlong[0][0] + latNlong[1][0]) / 2), (latNlong[0][1] + latNlong[1][1]) / 2])
}
// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoidWJhaWRwYXRlbDU5NSIsImEiOiJjbHU1ZGFxczYwdmZpMmpuNHljZHlibnB6In0.zMVbPdsglTT36MyuHzTfHQ';

const Map = () => {
  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();
  const latNlong = data.latNlong.length > 1 ? data.latNlong : false;
  const [distance, setDistance] = useState(data.distance*1000);
  useEffect(() => {
    (distance !== null) ?
      dispatch(updateDistance(distance)) : console.log(distance)
  }, [distance])
  useEffect(() => {
    if (!latNlong) {
      return "";
    }
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
        coordinates: [...latNlong[0]].reverse(), // Example coordinates for pickup location
        iconUrl: 'pick.png' // URL to pickup pin icon
      },
      {
        name: 'Drop',
        coordinates: [...latNlong[1]].reverse(), // Example coordinates for drop-off location
        iconUrl: 'drop.png', // URL to drop-off pin icon,
      }
    ];

    // Add markers to the map
    markers.forEach(marker => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(${marker.iconUrl})`; // Set background image for pin icon
      el.style.width = '25px'; // Set width of pin icon
      el.style.height = '35px'; // Set height of pin icon
      el.style.transform = 'rotate(20deg)';
      el.style.backgroundSize = 'cover'; // Ensure pin icon fits container

      new mapboxgl.Marker(el)
        .setLngLat(marker.coordinates)
        .addTo(map);
    });

    // Fetch route between pickup and drop-off locations
    fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${markers[0].coordinates[0]},${markers[0].coordinates[1]};${markers[1].coordinates[0]},${markers[1].coordinates[1]}?steps=true&geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`)
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
            'line-width': 5
          }
        });
        // Set the distance
        if(parseInt(distance) === 0 || distance === ""){
          // alert(distance)
          setDistance(data.routes[0].distance);
        }
      }).catch(error => console.error('Error fetching route:', error));

    // Clean up
    return () => map.remove();
  }, [latNlong]); // Only run this effect once, on component mount

  return (
    <>
      <div className={`${styles.row} ${styles.addrmap}`}>

        {
          (data.latNlong.length > 0) ?
            <>  <div className={styles.map}> <div id="map" style={{ width: '100%', height: '100%' }} />

            </div> <h2 className={styles.watermark}><h2>G</h2>oogle</h2> </> :
            <div className={`${styles.column} ${styles.maperror}`}>
              <img src="error.svg" alt="" className={styles.error} />
              <p>This site can't load google Maps Correctly.<br />
                g.co/staticmaperror/signature</p>
            </div>
        }
        <div className={styles.infops}>
          <div className={`${styles.column} ${styles.distance}`}>
            <div className={styles.vericalItem}>{(distance / 1000).toFixed(2)} kms</div>
            <div className={styles.vericalItem}>Distance</div>
          </div>
          <div className={styles.distancegap} />
          <div className={`${styles.column} ${styles.duration}`}>
            <div className={styles.vericalItem}>{(((data.duration) * 100) / 100).toFixed(2)} mins</div>
            <div className={styles.vericalItem}>Duration</div>
          </div>
        </div>
      </div></>)
};

export default Map;
