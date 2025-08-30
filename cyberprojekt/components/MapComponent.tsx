import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { Coords, Item } from '../types';

interface MapComponentProps {
  userLocation: Coords | null;
  items: Item[];
  onItemClick: (item: Item) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ userLocation, items, onItemClick }) => {
  const [mapHtml, setMapHtml] = useState<string>('');

  useEffect(() => {
    if (!userLocation) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
          <style>
            body { margin: 0; padding: 0; }
            #map { height: 100vh; width: 100vw; }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            const map = L.map('map').setView([${userLocation.latitude}, ${userLocation.longitude}], 17);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
              tileSize: 256,
              maxZoom: 19,
            }).addTo(map);

            const userMarker = L.circleMarker([${userLocation.latitude}, ${userLocation.longitude}], {
              color: 'blue',
              radius: 10,
            }).addTo(map);

            const items = ${JSON.stringify(items)};
            items.forEach(item => {
              L.marker([item.coords.latitude, item.coords.longitude], {
                icon: L.icon({
                  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              })
                .addTo(map)
                .on('click', () => {
                  window.ReactNativeWebView.postMessage(JSON.stringify(item));
                });
            });
          </script>
        </body>
      </html>
    `;
    setMapHtml(html);
  }, [userLocation, items]);

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: mapHtml }}
        style={styles.webview}
        onMessage={(event) => {
          const item = JSON.parse(event.nativeEvent.data);
          onItemClick(item);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default MapComponent;