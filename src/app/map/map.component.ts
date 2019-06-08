import { Component, OnInit, AfterViewInit } from "@angular/core";
import { environment } from "../../environments/environment";
import * as mapboxgl from "mapbox-gl";

import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Location } from "@angular/common";
import { element } from "@angular/core/src/render3/instructions";
import { semillaInfo } from "../models/semillaInfo";
import { SemillasService } from "../services/semillas.service";
import { Meta, MetaDefinition } from "@angular/platform-browser";
import { trigger, transition, style, animate } from "@angular/animations";
import { DeviceDetectorService } from "ngx-device-detector";
import { ChangeDetectorRef } from "@angular/core";
declare const FB: any;
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
  animations:[
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
    trigger('pullUp',[
        transition(':enter',[
            style({transform: 'translateY(10vh)', opacity: '0'}),
            animate('.3s ease-out', style({transform: 'translateY(0)', opacity:'1'}))
        ]),
        transition(':leave',[
            style({transform: 'translateY(0)', opacity: '1'}),
            animate('.3s ease-out', style({transform: 'translateY(10vh)', opacity:'0'}))
        ])
    ])
  ]
})
export class MapComponent implements OnInit, AfterViewInit {
  /// default settings 4.7258806,-74.2677694,15z
  map: mapboxgl.Map;

  style = "mapbox://styles/mapbox/satellite-streets-v9";
  currentSemilla: semillaInfo;
  lat = 17.760267;
  lng = -29.72925;
  objectsAddedToMap = [];
  objetosAnteriores;
  subscripcion;
  desktop;
  abierto:boolean = false;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private serviceSemillas: SemillasService,
    private meta: Meta,
    private deviceManager: DeviceDetectorService,
    private cdRef:ChangeDetectorRef
  ) {
    mapboxgl.accessToken = environment["mapbox"].accessToken;
    this.map = mapboxgl.Map;
    this.desktop=this.deviceManager.isDesktop()
  }
  ngAfterViewInit() {
  }
  ngOnInit() {
    this.initializeMap();
    if (!(typeof this.route.snapshot.params.id === "undefined")) {
      this.map.on("load", () => {
        document.getElementById("i12345").parentNode.removeChild(document.getElementById("i12345"));
        this.displayContent(this.route.snapshot.params.id);
      });
    } else {
      this.map.on("load", () => {
        if (document.getElementById("i12345"))
          document.getElementById("i12345").parentNode.removeChild(document.getElementById("i12345"));
        if (sessionStorage.getItem("mapInstructions") !== "check")
          document.getElementById("start-info").classList.toggle("active");
      });
    }
  }
  toggleOverlay() {
    document.getElementById("start-info").classList.toggle("active");
    sessionStorage.setItem("mapInstructions", "check");
  }
  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        });
      });
    }

    this.buildMap();
  }
  public buildMap() {
    this.map = new mapboxgl.Map({
      container: "map",
      style: this.style,
      zoom: 3,
      center: [this.lng, this.lat]
    });
    this.map.on('click', (event) => {
        if(this.abierto){
          this.pushDownSemilla();
        }
      })
    this.pintarMarkers();
  }
  public pintarMarkers() {
    if (this.objetosAnteriores) {
      this.objectsAddedToMap = this.objetosAnteriores;
      this.objectsAddedToMap.forEach(marker => {
        marker.addTo(this.map);
      });
    } else {
      this.subscripcion = this.serviceSemillas.observableSemillas.subscribe(
        semillas => {
          semillas.forEach(semilla => {
            {
                var coloresSemillas = [
                  "amarillo",
                  "blanco",
                  "verde",
                  "naranja"
                ];
                var rand =
                  coloresSemillas[
                    Math.floor(Math.random() * coloresSemillas.length)
                  ];
                var el = document.createElement("div");
                el.innerHTML = `<svg heigth="130" width="40" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><path style="fill:var(--color-${rand}); stroke:white " d="m16.4547,20.46156a8.40682,8.40682 0 0 0 -0.73364,-1.01971c-1.40729,-1.46266 -2.84226,-2.89763 -4.25878,-4.35106c-1.28732,-1.31962 -2.5931,-2.6254 -3.83429,-3.98655a4.43873,4.43873 0 0 1 -0.84437,-1.52264a1.04278,1.04278 0 0 1 0.46141,-1.33808a1.00586,1.00586 0 0 1 1.18581,0.35528c0.89051,0.8859 1.76719,1.78103 2.63924,2.68538q3.38672,3.50207 6.76883,7.00876c0.22147,0.2307 0.46141,0.42449 0.83976,0.74748a3.49285,3.49285 0 0 0 0.2307,-0.81669q-0.13381,-6.695 -0.2953,-13.38078q0,-0.99664 -0.02307,-1.99327a1.12122,1.12122 0 0 1 0.79362,-1.19504a1.49495,1.49495 0 0 1 1.49034,0.50293a2.89763,2.89763 0 0 1 0.51677,1.88254c0,1.73489 0,3.46977 0.02768,5.20466q0.05998,4.31876 0.17072,8.63291a2.43161,2.43161 0 0 0 0.30914,0.77055a2.51928,2.51928 0 0 0 0.72902,-0.35528c3.09604,-3.10988 6.17362,-6.24283 9.26965,-9.3527a7.5809,7.5809 0 0 1 1.28732,-1.03816a1.27348,1.27348 0 0 1 1.60569,0.22609a1.02894,1.02894 0 0 1 -0.19379,1.38422c-1.22734,1.22273 -2.47775,2.427 -3.72355,3.63127q-2.27012,2.19168 -4.54485,4.36952c-0.63674,0.60906 -1.29194,1.20427 -1.91945,1.84562c-0.26762,0.26762 -0.46141,0.5906 -0.86283,1.07508a8.41605,8.41605 0 0 0 1.0843,0q5.49535,-0.89513 10.98147,-1.80871a5.13545,5.13545 0 0 1 0.54907,-0.0323c0.42911,-0.02307 0.83053,0.02768 0.97357,0.52139a0.95511,0.95511 0 0 1 -0.46141,1.23657a6.32588,6.32588 0 0 1 -1.55955,0.50293c-2.60233,0.48448 -5.20928,0.92281 -7.81161,1.38422a12.15805,12.15805 0 0 1 -1.84562,0.28146c-1.58262,0.0323 -2.79612,0.79823 -3.8389,1.87792a1.84562,1.84562 0 0 0 -0.46141,1.05201c-0.06921,0.73364 0,1.4765 0,2.21475q0.05076,20.20959 0.11074,40.41918c0.02768,6.7919 0.11997,13.5838 0.14765,20.3757a2.30703,2.30703 0 0 0 1.13506,2.19629a3.54821,3.54821 0 0 1 1.2458,1.63338a13.84219,13.84219 0 0 1 0.92281,3.28521a54.09987,54.09987 0 0 1 0.60444,6.71346c0.03691,5.57379 -0.0646,11.14296 -0.14765,16.71675a18.35474,18.35474 0 0 1 -0.92281,5.66145a11.12912,11.12912 0 0 1 -1.25041,2.57003c-0.96434,1.43959 -2.44084,1.81794 -4.08806,1.64722a2.30703,2.30703 0 0 1 -1.76257,-1.21811a14.43279,14.43279 0 0 1 -1.2135,-2.47314c-0.92281,-2.51928 -1.26425,-5.15852 -1.55494,-7.80238c-0.76132,-7.0226 -0.76132,-14.0775 -0.66442,-21.12779a11.16603,11.16603 0 0 1 0.6229,-3.12833a4.46641,4.46641 0 0 1 2.40393,-2.76844c0.83515,-0.3922 1.07046,-0.95973 1.07508,-1.84562q0.04153,-21.87065 0.12458,-43.74131q0.0323,-9.68953 0.08767,-19.37906c0,-1.54571 -0.69672,-2.42238 -2.21014,-2.80996c-2.74075,-0.70134 -5.47689,-1.43497 -8.21764,-2.13631c-0.89051,-0.22609 -1.79948,-0.36912 -2.68538,-0.61367a3.36827,3.36827 0 0 1 -1.27809,-0.60444a1.16736,1.16736 0 0 1 -0.30453,-0.95973c0.04153,-0.20763 0.46141,-0.38297 0.75209,-0.46141a1.74412,1.74412 0 0 1 0.76132,0a42.67084,42.67084 0 0 1 7.3825,1.78564c1.30578,0.46141 2.67154,0.72902 4.00962,1.0843l0.21225,-0.22147l0,0.00001l0.00001,-0.00002z" id="svg_1" fill="black"/></svg>`;
                el.className = "marker-semilla";
                el.id = semilla._id;
                el.childNodes[0].addEventListener("click", () => {
                  this.displayContent(semilla._id);
                });

                // add marker to map

                let coordenadasMapeadas = this.serviceSemillas.geoPointsToArray(
                  semilla.geoInfo.source.data.geometry.coordinates
                );

                if (coordenadasMapeadas.length == 0) {
                  console.log(JSON.stringify(semilla));
                  return;
                }

                var markeri = new mapboxgl.Marker(el)
                  .setLngLat(
                    coordenadasMapeadas[coordenadasMapeadas.length - 1]
                  )
                  .addTo(this.map);

                this.objectsAddedToMap.push(markeri);
              
            }
          });
        }
      );
    }
  }

  public displayContent(idSemilla) {
    this.serviceSemillas.obtenerSemilla(idSemilla).subscribe(data => {
      this.currentSemilla = data;
      this.cdRef.detectChanges();
      console.log(this.currentSemilla);
      data.geoInfo.source.data.geometry.coordinates = this.serviceSemillas.geoPointsToArray(
        data.geoInfo.source.data.geometry.coordinates
      );
      this.objetosAnteriores = this.objectsAddedToMap;
      let contador = 0;
      if (this.currentSemilla.testimonialType == "audio") {
        while (contador < 4) {
          let audioElement = <HTMLAudioElement>(
            document.getElementById("audio" + (contador + 1))
          );
          audioElement.src = this.currentSemilla.audios[contador];
          audioElement.load();
          contador++;
        }
      }

      this.objectsAddedToMap.forEach(element => {
        if (!(element.getElement().id == idSemilla)) {
          element.remove();
        }
      });

      this.location.replaceState(`/map/${idSemilla}`);
      
      if(this.desktop){
        console.log(this.desktop);
        
        document.getElementById("aside-desktop").classList.add("aside-desktop-active")
      }
      // document.getElementById(`${idSemilla}`).classList.add("marker-big")

      this.map.addLayer(data.geoInfo);
    });
  }

  public closeAside() {
    if (sessionStorage.getItem("mapInstructions") !== "check")
      document.getElementById("start-info").classList.toggle("active");
    this.subscripcion.unsubscribe();
    this.location.replaceState(`/map`);
    if(this.desktop){
      document.getElementById("aside-desktop").classList.remove("aside-desktop-active");
    }else{
      document.getElementById("aside").classList.remove("aside-active");
    document.getElementById("map").classList.remove("active-aside");
    this.map.resize();
    }
    
    // document.getElementById(this.currentSemilla._id).classList.remove("marker-big")
    this.map.removeLayer(this.currentSemilla.geoInfo.id + "");
    this.map.removeSource(this.currentSemilla.geoInfo.id + "");
    this.currentSemilla = null;
    this.pintarMarkers();
  }

  pushUpSemilla(){
    this.abierto = true;
    document.getElementById("aside").classList.add("aside-active");
    setTimeout(()=>{
      document.getElementById("map").classList.add("active-aside");
      this.map.resize();
    }, 500)
  }

  pushDownSemilla(){
    this.abierto = false;
    document.getElementById("aside").classList.remove("aside-active");
    document.getElementById("map").classList.remove("active-aside");
    this.map.resize();
  }


  shareFacebook() {
    FB.ui(
      {
        method: "share",
        display: "popup",
        href: `https://beta.semillasvenezuela.org/${
          this.route.snapshot.params.id
        }`
      },
      function(response) {}
    );
  }
  shareTwitter() {
    window.open(
      "https://twitter.com/share?text=¡Descubre el testimonio de un venezolano por el mundo! &hashtags=SomoSemillas,Venezuela&url=" +
        document.URL,
      "twitter-popup",
      "height=350,width=600"
    );
  }
}
