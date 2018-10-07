import {Component, OnInit, AfterViewInit} from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl:'./map.component.html',
  styleUrls:['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
/// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-streets-v9';
  lat = 17.760267;
  lng = -29.72925;
  geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: 'Mapbox',
        description: 'Washington, D.C.'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California'
      }
    }]
  };
  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map= mapboxgl.Map;
    
  }
  ngAfterViewInit(){
    this.initializeMap();
  }
  ngOnInit() {
    console.log("Entré")
    
  }
  
  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      });
    }

    this.buildMap()

  }
  public buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 4,
      center: [this.lng, this.lat]
    });
    
    this.map.addLayer();

  
}
}