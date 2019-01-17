import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SemillasService } from '../../services/semillas.service';
import { semillaInfo } from '../../models/semillaInfo';
declare const navigator: any;
declare const MediaRecorder: any;
import * as RecordRTC from 'recordrtc';

@Component({
    selector: 'app-crear-semilla',
    templateUrl: 'crearSemilla.component.html',
    styleUrls: ['crearSemilla.component.css']
})
export class CrearSemillaComponent implements OnInit {

    public semilla: semillaInfo = new semillaInfo();
    
    private stream: MediaStream;
    private recordRTC: any;
    private isRecording:boolean;
    private interval:any;

    constructor(public router: Router, public semillasService: SemillasService) {

    }

    ngOnInit() {
     
            
        
    }

    crearSemilla() {
        console.log(1)

        this.semillasService.anadirSemilla(this.semilla).then(
            () => {
                console.log("Semilla creada");
            }
        )
    }

    public record() {
        this.isRecording= true;
        let mediaConstraints = {
            video: false,
            audio: true
          };
          navigator.mediaDevices
            .getUserMedia(mediaConstraints)
            .then(this.successCallback.bind(this), this.errorCallback.bind(this));
       
    }

    public stop() {
        clearInterval(this.interval);
        this.isRecording= false;
        let recordRTC = this.recordRTC;
        recordRTC.stopRecording(this.processVideo.bind(this));
        let stream = this.stream;
        stream.getAudioTracks().forEach(track => track.stop());
        stream.getVideoTracks().forEach(track => track.stop());
    }


    successCallback(stream: MediaStream) {
        var options = {
                type: 'audio'
            };
            this.stream = stream;
            this.recordRTC = RecordRTC(stream, options);
            this.recordRTC.startRecording();
            let timer = 0;
            this.interval = setInterval(()=>{
                
                console.log(timer)
                timer++;
                if(timer>20){
                    this.stop()
                    clearInterval(this.interval);
                }
            },1000)
            
          }
          errorCallback() {
            //handle error here
          }
        
          processVideo(audioVideoWebMURL) {
            
            let recordRTC = this.recordRTC;
            var recordedBlob = recordRTC.getBlob();
            console.log(recordedBlob);
            this.semillasService.uploadFile("hola", recordedBlob)
            recordRTC.getDataURL(function (dataURL) { });

          }
}