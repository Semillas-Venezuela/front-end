import {Component, OnInit, AfterViewInit} from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl:'./map.component.html',
  styleUrls:['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
/// default settings 4.7258806,-74.2677694,15z
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-streets-v9';
  lat = 17.760267;
  lng = -29.72925;
  objectsAddedToMap=[];
  navigationSubscription;
  geojson2= {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Semilla",
            "properties": {
                "message": "Baz",
                "iconSize": [40, 40],
                "urlID": "edb76afd399b272b5f1090bd661c0447"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                  -74.2677694,15,
                    4.7258806
                ]
            }
        }
    ]
};
  geojson={
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "message": "Foo",
                "iconSize": [60, 60],
                "urlID": "6e0f6f63b0f2b8f1ef2eed991dcc75dc",
                "imagen":"",
                "audio1":""
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    28.0289837,
                    1.6666663

                     
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
  constructor(public router: Router,private route:ActivatedRoute, private location: Location ) {
    mapboxgl.accessToken = environment['mapbox'].accessToken;
    this.map= mapboxgl.Map;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
            this.ngOnInit();
        }
    });
    
  }
  ngAfterViewInit(){
    
  }
  ngOnInit() {
    this.initializeMap();
    console.log(this.route.snapshot.params.id)
    if( !(typeof this.route.snapshot.params.id === "undefined")){
       this.displayContent(this.route.snapshot.params.id)
    }

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
      <path style="fill:var(--color-${rand});"  d="M222.78,186.46a18.22,18.22,0,0,0-1.59-2.21c-3.05-3.17-6.16-6.28-9.23-9.43-2.79-2.86-5.62-5.69-8.31-8.64a9.62,9.62,0,0,1-1.83-3.3,2.26,2.26,0,0,1,1-2.9,2.18,2.18,0,0,1,2.57.77c1.93,1.92,3.83,3.86,5.72,5.82q7.34,7.59,14.67,15.19c.48.5,1,.92,1.82,1.62a7.57,7.57,0,0,0,.5-1.77q-.29-14.51-.64-29,0-2.16-.05-4.32a2.43,2.43,0,0,1,1.72-2.59,3.24,3.24,0,0,1,3.23,1.09,6.28,6.28,0,0,1,1.12,4.08c0,3.76,0,7.52.06,11.28q.13,9.36.37,18.71a5.27,5.27,0,0,0,.67,1.67,5.46,5.46,0,0,0,1.58-.77c6.71-6.74,13.38-13.53,20.09-20.27a16.43,16.43,0,0,1,2.79-2.25,2.76,2.76,0,0,1,3.48.49,2.23,2.23,0,0,1-.42,3c-2.66,2.65-5.37,5.26-8.07,7.87q-4.92,4.75-9.85,9.47c-1.38,1.32-2.8,2.61-4.16,4-.58.58-1,1.28-1.87,2.33a18.24,18.24,0,0,0,2.35,0q11.91-1.94,23.8-3.92a11.13,11.13,0,0,1,1.19-.07c.93-.05,1.8.06,2.11,1.13a2.07,2.07,0,0,1-1,2.68,13.71,13.71,0,0,1-3.38,1.09c-5.64,1.05-11.29,2-16.93,3a26.35,26.35,0,0,1-4,.61c-3.43.07-6.06,1.73-8.32,4.07a4,4,0,0,0-1,2.28c-.15,1.59,0,3.2,0,4.8q.11,43.8.24,87.6c.06,14.72.26,29.44.32,44.16a5,5,0,0,0,2.46,4.76,7.69,7.69,0,0,1,2.7,3.54,30,30,0,0,1,2,7.12A117.25,117.25,0,0,1,242,363.8c.08,12.08-.14,24.15-.32,36.23a39.78,39.78,0,0,1-2,12.27,24.12,24.12,0,0,1-2.71,5.57c-2.09,3.12-5.29,3.94-8.86,3.57a5,5,0,0,1-3.82-2.64,31.28,31.28,0,0,1-2.63-5.36c-2-5.46-2.74-11.18-3.37-16.91-1.65-15.22-1.65-30.51-1.44-45.79a24.2,24.2,0,0,1,1.35-6.78,9.68,9.68,0,0,1,5.21-6c1.81-.85,2.32-2.08,2.33-4q.09-47.4.27-94.8.07-21,.19-42c0-3.35-1.51-5.25-4.79-6.09-5.94-1.52-11.87-3.11-17.81-4.63-1.93-.49-3.9-.8-5.82-1.33a7.3,7.3,0,0,1-2.77-1.31,2.53,2.53,0,0,1-.66-2.08c.09-.45,1-.83,1.63-1a3.78,3.78,0,0,1,1.65,0,92.48,92.48,0,0,1,16,3.87c2.83,1,5.79,1.58,8.69,2.35Z"/>
      </svg>`
      el.className = 'marker-semilla';
      el.id = marker.properties.urlID;
      //el.style.backgroundImage = 'url("../../assets/mapbox-icon.png")';


      el.addEventListener('click', ()=>{
        this.displayContent(marker.properties.urlID)
      });

    // add marker to map
      
     var markeri =  new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(this.map);
      
      this.objectsAddedToMap.push(markeri);
    })
 
  
}
  public displayContent(idSemilla){
    console.log(idSemilla);
    this.objectsAddedToMap.forEach(element => {
      if(!(element.getElement().id == idSemilla))
        { element.remove()}
    });

    this.location.replaceState(`/map/${idSemilla}`);
    document.getElementById("aside").classList.add("aside-active");
    document.getElementById(`${idSemilla}`).classList.add("marker-big")
    
  }
}