import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { semillaInfo } from '../../../models/semillaInfo';
import { SemillasService } from '../../../services/semillas.service';
import { trigger, transition, style, animate } from '@angular/animations';

export class place  {
  coordinates: [number, number];
  country: string;
  place_name: string;
  short_code: string;
}

@Component({
  selector: 'step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
      transition(':leave', [
        style({ opacity: '100' }),
        animate('.5s ease-out', style({ opacity: '0' })),
      ]),
    ]),
  ]
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
  users: any = [];
  lineString = []
  loaded: boolean;
  constructor(public serviceSemillas:SemillasService) {
    mapboxgl.accessToken = environment['mapbox'].accessToken;
    this.map = mapboxgl.Map;

  }

  ngOnInit() {

    this.initializeMap();
    this.geocoder = new MapboxGeocoder({
      accessToken: environment['mapbox'].accessToken,
      placeholder: "Buscar",
      zoom: 16,
      flyTo: false
    });
    

    this.geocoder.on('result', (ev) => {
          this.geocoding(ev.result.geometry.coordinates)
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
      console.log("touchEvent:"+coordinates)
    })
    this.map.on("load", x=>{
      document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map));
      this.map.addSource("linea-pintada", {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": []
      }
      })
      this.map.addLayer({
        "id": "linea",
        "type": "line",
        "paint": {
          "line-color": "#C7AF61",
          "line-opacity": 1,
          "line-width": 4
        },
        "source": "linea-pintada",
        "filter": ["==", "$type", "LineString"]
      });
      
      this.map.addLayer({
        "id": "puntos",
        "type": "circle",
        "source": "linea-pintada",
        "paint": {
          "circle-radius": 6,
          "circle-color": "#e87554"
        },
        "filter": ["==", "$type", "Point"],
      });
   
  
    })
   
    

  }
  geocoding(coordinates) {
    this.geocoder.mapboxClient.geocodeReverse({
      latitude: coordinates[1],
      longitude: coordinates[0]
    }, (err, res) => {
      console.log(res);
      console.log(err);
      try {
        let place = res;
        place = place.features
        place = this.createPlace(place);
        console.log(place);
        if(this.users.length != 0 && place.place_name != this.users[this.users.length - 1].place_name){
          console.log("diferent:"+place.place_name+"-"+this.users[this.users.length - 1].place_name)
          this.users.push(place)
          this.users = this.users.slice()
        }else if(this.users.length == 0) {
          this.users.push(place)
          this.users = this.users.slice()
        }else{
          console.log("repetidoooo|bouncing results")
        }
      }

      catch (e) {
        console.log(e)
        let place = res;
        place = `Lat: ${coordinates[1]} Lon: ${coordinates[0]}`
        if(place != this.users[this.users.length - 1]){
          console.log("diferent:"+place+"-"+this.users[this.users.length - 1])
          this.users.push(place)
          this.users = this.users.slice()
        }
      }
    })
    if(coordinates != this.lineString[this.lineString.length - 1]){
      console.log("diferent:"+JSON.stringify(coordinates)+"-"+JSON.stringify(this.lineString[this.lineString.length - 1]))
      this.lineString.push(coordinates)
      this.pintarLinea(this.lineString)
    }

    console.log(this.users)
    console.log(this.lineString)
  }
  pintarLinea(coordinates) {

    let line = {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": coordinates
      }
    }
    let features = [line]
    this.lineString.forEach(element => {
      let object = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": element
        }
      }
      features.push(object)
    });


    this.map.getSource("linea-pintada").setData({
      "type": "FeatureCollection",
      "features": features
    })



  }
  remove(user) {
    this.lineString.splice(this.users.indexOf(user), 1)

    this.pintarLinea(this.lineString)

    this.users.remove(user);
    this.users = this.users.slice();


    
  }
  createPlace(features:any[]) : any{
    // Crea objeto con las respuestas obtenidas de la Query
      let retObj= {};
    // Pro cada respuesta (separada por zonas, asigna unos respectivos valores)
      features.forEach(obj=>{

        if(obj.id.includes('place')){
          // Valores del lugar elejido
          retObj['place_name'] = obj.text;
          retObj['coordinates'] = obj.center;
        }else if(obj.id.includes('country')){
          // Valores del Pais del lugar elejido
          retObj['country'] = obj.text
          if(!retObj['coordinates']){
            retObj['coordinates'] = obj.center;
          }
          retObj['short_code'] = obj.properties.short_code;
        }
        if(obj.id.includes('region')){
          // Valores de region
          if(!retObj['coordinates']){
            retObj['coordinates'] = obj.center;
          }
          retObj['place_name'] += retObj['place_name'] ? ", "+obj.text : obj.text;
        }
      })
      return retObj;
  }

  step(valor) {
    if(!(valor == 1))
      this.semilla.place = this.users[this.users.length -1].place_name;
    console.log(this.semilla.place);
    let geoPoints = this.serviceSemillas.arrayToGeopoints(this.lineString)
    this.semilla.geoInfo= {
      "id": "geopoints",
      "type": "line",
      "source": {
          "type": "geojson",
          "data": {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "LineString",
                  "coordinates":geoPoints ,
              }
          }
      },
      "layout": {
          "line-join": "round",
          "line-cap": "round"
      },
      "paint": {
        "line-color": "#C7AF61",
        "line-opacity": 1,
        "line-width": 4
      }
  };
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

  instructions(){
    document.querySelector(".instructions").classList.add("display-block")
  }



}