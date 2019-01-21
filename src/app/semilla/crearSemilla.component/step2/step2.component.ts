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
  users:any=[];
  constructor() {
    mapboxgl.accessToken = environment['mapbox'].accessToken;
    this.map = mapboxgl.Map;

  }

  ngOnInit() {
    this.users.remove  = function() {
      var what, a = arguments, L = a.length, ax;
      while (L && this.length) {
          what = a[--L];
          while ((ax = this.indexOf(what)) !== -1) {
              this.splice(ax, 1);
          }
      }
      return this;
  };
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
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat]
      this.geocoder.mapboxClient.geocodeReverse({
        latitude:coordinates[1],
        longitude:coordinates[0]
      }, (err, res)=>{
        
        try{
          let place=res;
          place =place.features.filter(obj=>{
            return obj.id.includes("place")
          })[0].place_name
          console.log(place)
          this.users.push(place)
          this.users=this.users.slice()
        }
          
        catch(e){
          let place=res;
          place=`Lat: ${coordinates[1]} Lon: ${coordinates[0]}`
          console.log(place)
          this.users.push(place)
          this.users=this.users.slice()
        }
        
        
      })
    })


  }


  remove(user){
    this.users.remove(user);
    this.users= this.users.slice();
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