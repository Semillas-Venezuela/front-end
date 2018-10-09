import {Component, OnInit, AfterViewInit} from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router'

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
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "message": "Foo",
                "iconSize": [60, 60],
                "urlID": "6e0f6f63b0f2b8f1ef2eed991dcc75dc"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -66.324462890625,
                    -16.024695711685304
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "Bar",
                "iconSize": [50, 50],
                "urlID": "f983bd17f999197fbe7ae42f45571deb"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -61.2158203125,
                    -15.97189158092897
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "Baz",
                "iconSize": [40, 40],
                "urlID": "edb76afd399b272b5f1090bd661c0447"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -63.29223632812499,
                    -18.28151823530889
                ]
            }
        }
    ]
};
  constructor(public router: Router) {
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
      zoom: 3,
      center: [this.lng, this.lat]
    });
    
    this.geojson.features.forEach((marker)=>{
      var coloresSemillas = ['amarillo','blanco','verde','naranja'];
      var rand = coloresSemillas[Math.floor(Math.random() * coloresSemillas.length)];
      var el = document.createElement('div');
      el.innerHTML = 
      `<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.76 24.98">
      <path style="fill:var(--color-${rand});"  d="M.11,1.94S-.53.12,1.31,1c.09.05,2.4,2.16,2.4,2.16L6.59,0s1.77-.3,1,1.2c-.09.17-3.12,3.36-3.12,3.36v9.6a1,1,0,0,1,.48.24,1,1,0,0,1,.24.72c0,1-.05,7-.48,8.64h0s-1.92,2.68-2.64,0c0-.1-.34-9.41.24-9.36,0,0,.07-.24.72-.48.13,0,0-9.6,0-9.6Z"/>
      </svg>`
      el.className = 'marker-semilla';
      //el.style.backgroundImage = 'url("../../assets/mapbox-icon.png")';


      el.addEventListener('click', ()=>{
        this.displayContent(marker.properties.urlID)
      });

    // add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(this.map);
    })


  
}
  public displayContent(idSemilla){
    console.log(idSemilla);
    this.router.navigate([`/map/${idSemilla}`]);
  }
}