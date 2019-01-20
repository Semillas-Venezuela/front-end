import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { semillaInfo } from '../../../models/semillaInfo';

@Component({
  selector: 'step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2 implements OnInit {
  @Input() semilla: semillaInfo;
  @Output() semillaChange = new EventEmitter<semillaInfo>();
  map: mapboxgl.Map;
  lat = 17.760267;
  lng = -29.72925;
  style = 'mapbox://styles/mapbox/satellite-streets-v9';
  geocoder;
  chev: boolean = false;
  users=[1,2,3,4,5,6,7,8,9,10];
  constructor() {
    mapboxgl.accessToken = environment['mapbox'].accessToken;
    this.map = mapboxgl.Map;

  }

  ngOnInit() {
    this.initializeMap();
    this.geocoder = new MapboxGeocoder({
      accessToken: environment['mapbox'].accessToken,
      placeholder: "Buscar",
      zoom: 16,
      flyTo: true
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


 
  pushElement(){
    this.users.push(this.users[this.users.length-1]+1)
    this.users = this.users.slice()
    console.log(this.users);
  }
  search() {
    document.querySelector(".search-bar").classList.toggle("active")
  }
  step(valor) {
    console.log("cambió");
    this.semilla.step = valor;
  }
  chevron() {
    document.querySelector(".listed").classList.toggle("active")
    let element: any = document.getElementById("chevron")
    if (!this.chev) {
      this.chev = !this.chev;
      element.classList.replace("fa-chevron-up", "fa-chevron-down")
    }
    else {
      this.chev = !this.chev;
      element.classList.replace("fa-chevron-down", "fa-chevron-up")
    }

  }
}