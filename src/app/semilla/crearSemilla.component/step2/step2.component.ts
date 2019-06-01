import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { semillaInfo } from '../../../models/semillaInfo';
import { SemillasService } from '../../../services/semillas.service';

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
  users: any = [];
  lineString = []
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
      flyTo: true
    });
    document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map));

    this.geocoder.on('result', (ev) => {
      console.log(ev)
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
          "line-color": "yellow",
          "line-opacity": 0.75,
          "line-width": 5
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
          "circle-color": "#B42222"
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

      try {
        let place = res;
        place = place.features.filter(obj => {
          return obj.id.includes("place")
        })[0].place_name
        
        this.users.push(place)
        this.users = this.users.slice()
      }

      catch (e) {
        let place = res;
        place = `Lat: ${coordinates[1]} Lon: ${coordinates[0]}`

        this.users.push(place)
        this.users = this.users.slice()
      }
    })

    this.lineString.push(coordinates)
    this.pintarLinea(this.lineString)
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


  step(valor) {

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
          "line-color": "red",
          "line-width": 3
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