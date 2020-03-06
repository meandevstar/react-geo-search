import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types'
import { icon } from 'leaflet';
import cheapRuler from 'cheap-ruler'
import { Map, TileLayer, Popup, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import styles from './index.module.scss'

const shopIcon = icon({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEQUlEQVRoge2YW2xUVRiFv/+0nWGgDRrRUgkx1EsKUh+aKVChdWoifYCCNDExMY0matQHC6UaDUHTF0280KJ9kYQYDTE8EewFiI2EtlPtgDM+INga7xeiJlVCGqGd6Zzfh05sLbNnOvs04WXW2+x/r/WvNWefs/c5kEceeeRxIyGLKaYhVpBkF7AdqABWpUqXgDGgFx/H5TR/LVbPRQmgW1nGJC+itAHFWaZPoBzgGm9JjKtee3sOoHWsRvkYqMqReh7hYRniRy/9PQXQLZQjjAC32QnwJw41XkI4tkTdTAlCL7bmAYRSXHo0lHXZGWEdAGEfsM6aP6uznmlesqVbBdAQKxF2Z5jSDYQIUEyAYpT61NVKD2GvbqTUxkuhDYlpmhACaWvKyzLMG/NGB4ABrWUf8Foa1lJ87ALey9WK3RISGg2V7jTmZ2lhXgf6DGWTZkbY3gP3GMY7F9CxI0fNLHJ2KEs7WkAsK3OaqKFyu40R2wBTljyYNu49kzZytgEupB2dJpiV6TfO+drGiO1N/IlBbW9WrhrmmDSzwC6AwwdA8rpxpTH1qEwLrWM/sC1NKZnSzBnWZyGtpRvYYSj34dCB8AUALhtS/3w68wA9EmanjQ/7AHVsRe0uexoXDTJEvx3VA7SWM0DIiwYwLGFqbcn2hzkA5RVP/Bns90L2FECGGQZOeJA4IWEGvXjwdgUAhFbsNrY4Bbzgtb3nADLEtwhv50xU3pQBxjz39yoAoDUEKOQCUL5Ayi8EWCf9/OO1t3WA9ovqu3kiUakOVSJUVESPBB86+lSdqGbkqQifPnp4cLS6OabKmLh8ebmk6Kv2eyVu4yOnAJ0jU2vFYQfodkQ2AkVz6/XHWrjv80MZNc5vfpYzTe/MH04IGkGlz3Xpba3xjy7UU9YA7arO8mi8SVzdjciWTHML41d57EA1N41/l7Z+5ZY1fNQWJeHP/A4vaNhFDu6p9h0XkYyXNGOAd6OTd7ou74PUZew4B2U/R3ik60FE/39UUsfh2HP9XCrPZc+SARX3ydbqJT+YZhifQl1nr61xXeezXMwD/H7HJmL1rdeNx0JtOZoH0JAoZztik3eZZhgDuCIfglp9KYg0vMp4WeV/v8fLKok02G7askKSHDZVjQEUyf5yYkCy0M/Jx48S95eQ8C3jVPMRkoV+WzkE2WCqGT+rKHpOkAdsm16+9W4Gmmbe8f8uXWsrMwORiKlk/i6U1CcocCK2ywhgNNhsS50DHXdEnzZVjUuotSbwkyaTm0BOL4ILKwgaFpf7W4JLvjfPyQJVlYPn4jsR3eNlSeUCRQcdkc6WoK/H0z4wH13RqYqkaqMq2wSpAXyenM5iCmQEcU8WiPQ+H/Qv+JBnfRY6FNWiKU2sd12qVLRClFWgq0FWIlKCqA9learLFVTiqE6A/gHyK/AbyDcqxJY6RRefCUrC1kseeeSRx43Dv6UtQFHmLpnPAAAAAElFTkSuQmCC',
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const posIcon = icon({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADwElEQVRoge2YTWhcVRiGn/fO3JmkSZpYtAoasLZCRKVQ0phIo4I0kv4FhLgoFNQKdqGxXQZcZOPCTadpV1JLdSUSgpDWhkKqSJGkSSqCFBt/ULCikJJiQuj83s9FhvrTuXcy44lddJ7l/b5z3u+955w53x2oUePuRmsxqZ3va6UQpBA9RZkJYFC9Y3OutZwbsPN9rQTB18CGf4UWsPxW7Rq/5lLPczkZAIUgxe3FA2xA8aOu5dwbuLVtSvKCazn3BqIx1xOugQFNhIaM8FiVrMUKDAILJZ4vELdB12LODah3bA7LbwVGgEVgEWOUmHWq5+z3rvVq3GmcX2Q9Bw5tJMgPmLEbeLT4+DvDPvVzwfHxkdPzLvWcGti5/2C/oVOCphC5RTNenfjo5KgrTWcGdu4/2A/6eBVzmpn6XZlwYqDnwKGNQSH/Q/ibv012MZ7Lb3Gxndz8jAb5gdUXD2Dr84n4Gy6knRiwQHsqH2R7XWi7WQHZ5kqHGGxxIe3qJm6sdEBlWy6c/7sbdU7NwJ2mZgBAZvuA3yoYMg/2khNtF5MA9Pa/cl/ej30A7CqTei6eK7zsqqlztoXGR07PI71fLk9mJ112pE7PgCe7Xi4nIFY2pyJNl5MVcpQtzqN8TiVUfQaGrljinqXck+axTaItMHsos3Rj04VTb2+PGvf8a+9M1zW2/CTpVzOuKuCrG03+N0OPK1tNHfFKklOTmcfksQ9sD8vZp8zDBzBbeRPJxmaQVh6UQiLZsL4D6LBijnnQspzNDU+npzCdDQLOHOlKfuvMwJCZ1zybfVGBvYXYUawkpD4PP7mOXHq5ZDyRbEAquWt9Q92IbsV4d3g6fTFAxw5vT3wiKfLPsMgzcHw2vbllJvO5jBGkHVG5t4qsbwiN+RGxv2OoWzA6PJP7LDWTfiQqN9TAiUs3NwWB9yXomVWpFknUhzemUbHS2HMyLh29nA5tvUMNBNKHYPdXqEiiLvwtJ1e5Av9E96pA6P0SasBQexVq+PXhbb5fV/FnAwBCHWGxCAM2XY1YMmIFos5HJNJUaCgskJq8+bBisalqtpFb7Lrn0TnQXvdjqWjoChzpqv/ZCoVO0IW1Ky4aYRcV8HRY8Ss5ZTAzHZvO9iE7LPSs2xJDNLEvPCk10J4YK3cPVNRKnJjNtBXM9pqxW6gLSPynSv8iA5pEwbmYdObN9uTV1Q6suhd6b9b8jOWeCAK2maxNxoNgraAHkJqQJTCaiyp/YMpitgT2O+gX4BpozsTldZ5/5fV25aqtpUaNu5k/AVXQNgeopUyYAAAAAElFTkSuQmCC',
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const ShopMarker = ({ text, position, icon }) => (
  <Marker icon={icon} position={position}>
    <Popup>
      {text}
    </Popup>
  </Marker>
);

const stamenTonerAttr = '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const stamenTonerTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export default function ShopMap({ data, center, zoom, onPosChange }) {
  const [bounds, setBounds] = useState([
    [49.505, -2.09],
    [53.505, 2.09],
  ])
  const [pos, setPos] = useState(null)
  const onMapClick = useCallback(e => {
    setPos(e.latlng)
    onPosChange(e.latlng)
  }, [setPos])

  useEffect(() => {
    if (!data.length) {
      return;
    }

    const newBounds = data.map(v => v.location);
    if (pos) {
      newBounds.push(pos)
    }
    setBounds(newBounds)
  }, [data]);

  return (
    <Map className={styles.root} bounds={bounds} onClick={onMapClick}>
      <TileLayer
        attribution={stamenTonerAttr}
        url={stamenTonerTiles}
      />
      {data.map(({ location, name }, index) => (
        <ShopMarker
          position={location}
          text={name}
          key={`shop-${index}`}
          icon={shopIcon}
        />
      ))}
      {pos &&
        <ShopMarker
          position={pos}
          text="My Location"
          icon={posIcon}
        />
      }
    </Map>
  );
}

ShopMap.defaultProps = {
  center: {
    lat: 59.95,
    lng: 30.33
  },
  zoom: 11
};

ShopMap.propTypes = {
  center: PropTypes.object,
  zoom: PropTypes.number
}