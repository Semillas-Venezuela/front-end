import {Component,OnInit, Input, Output, EventEmitter} from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { semillaInfo } from '../../../models/semillaInfo';

@Component({
  selector: 'step2',
  templateUrl:'./step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2 implements OnInit {
    @Input() semilla:semillaInfo;
    @Output() semillaChange= new EventEmitter<semillaInfo>();
    map: mapboxgl.Map;
    lat = 17.760267;
    lng = -29.72925;
    style = 'mapbox://styles/mapbox/satellite-streets-v9';
    geocoder;
    constructor(){
      mapboxgl.accessToken = environment['mapbox'].accessToken;
        this.map = mapboxgl.Map;

    }
    ngOnInit(){
      this.initializeMap();
             this.geocoder = new MapboxGeocoder({
          accessToken: environment['mapbox'].accessToken,
          placeholder: "Buscar",
          zoom: 4
      });
      document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map));
      
      this.geocoder.on('result', (ev) => {
        
        console.log(ev.result.geometry)
      });
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
        zoom: 3,
        center: [this.lng, this.lat]
    });
    


}
    search(){
      document.querySelector(".search-bar").classList.toggle("active")
    }
    setStatus(valor){
      console.log("cambió");
      this.semilla.step2=true;
    }
}