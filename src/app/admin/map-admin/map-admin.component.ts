import { Component,OnInit,OnChanges, Input, SimpleChanges } from "@angular/core";
import { semillaInfo } from "../../models/semillaInfo";
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { SemillasService } from "../../services/semillas.service";

@Component({
    selector:"app-admin-map",
    styleUrls:["./map-admin.component.css"],
    templateUrl:"./map-admin.component.html"
})
export class MapAdminComponent implements OnInit,OnChanges{
    @Input() semillaAPintar: semillaInfo;
    map: mapboxgl.Map
    lat = 17.760267;
    lng = -29.72925;
    style = 'mapbox://styles/mapbox/satellite-streets-v9';

    constructor( private serviceSemillas: SemillasService){
        mapboxgl.accessToken = environment['mapbox'].accessToken;
        this.map = mapboxgl.Map;
    }
    ngOnInit(){
        this.initializeMap();
    }
    ngOnChanges(changes: SimpleChanges) {
       
        
            let change = changes["semillaAPintar"];           
            this.pintarCamino(change.previousValue, change.currentValue, change.firstChange)
          
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
    public pintarCamino(lastSemilla:semillaInfo, currentSemilla: semillaInfo, firstChange:boolean){
        if(!firstChange){
            if(lastSemilla === undefined){
                let data= currentSemilla;
                data.geoInfo.source.data.geometry.coordinates = this.serviceSemillas.geoPointsToArray(data.geoInfo.source.data.geometry.coordinates)
                this.map.addLayer(data.geoInfo);
                console.log("entré acá")
            }else{
                console.log("entré acá2")
                let data= currentSemilla;
                data.geoInfo.source.data.geometry.coordinates = this.serviceSemillas.geoPointsToArray(data.geoInfo.source.data.geometry.coordinates)


                this.map.removeLayer(lastSemilla.geoInfo.id).removeSource(lastSemilla.geoInfo.id);
                
                this.map.addLayer(data.geoInfo);
                // this.map.getLayer(data.geoInfo).setLayer;
                
            }
        }
        
    }
}