import {Component, OnInit} from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl:'./map.component.html',
  styleUrls:['./map.component.css']
})
export class MapComponent implements OnInit {
/// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/rembrandtsx/cjmcktbbm5ies2ro6w9ed43i5';
  lat = 17.760267;
  lng = -29.72925;

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {
    console.log("Entré")
    this.initializeMap();
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
  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 2,
      center: [this.lng, this.lat]
    });
}
}