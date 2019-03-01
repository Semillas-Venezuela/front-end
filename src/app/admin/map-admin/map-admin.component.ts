import { Component, OnInit, OnChanges, Input, SimpleChanges } from "@angular/core";
import { semillaInfo } from "../../models/semillaInfo";
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { SemillasService } from "../../services/semillas.service";

@Component({
    selector: "app-admin-map",
    styleUrls: ["./map-admin.component.css"],
    templateUrl: "./map-admin.component.html"
})
export class MapAdminComponent implements OnInit, OnChanges {
    @Input() semillaAPintar: semillaInfo;
    map: mapboxgl.Map
    lat = 17.760267;
    lng = -29.72925;
    style = 'mapbox://styles/mapbox/satellite-streets-v9';
    contador = 0
    constructor(private serviceSemillas: SemillasService) {
        mapboxgl.accessToken = environment['mapbox'].accessToken;
        this.map = mapboxgl.Map;
    }
    ngOnInit() {
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
        this.map.on("load", x => {

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
        })
    }
    public pintarCamino(lastSemilla: semillaInfo, currentSemilla: semillaInfo, firstChange: boolean) {
        if (!firstChange) {
            currentSemilla.geoInfo.source.data.geometry.coordinates = this.serviceSemillas.geoPointsToArray(currentSemilla.geoInfo.source.data.geometry.coordinates)
            let line = {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": currentSemilla.geoInfo.source.data.geometry.coordinates
                }
            }
            let features = [line]
            this.map.getSource("linea-pintada").setData({
                "type": "FeatureCollection",
                "features": features
            })
            currentSemilla.geoInfo.source.data.geometry.coordinates = this.serviceSemillas.arrayToGeopoints(currentSemilla.geoInfo.source.data.geometry.coordinates)
        }
    }
}