import {Component,OnInit, Input, Output, EventEmitter} from '@angular/core';
declare const navigator: any;
declare const MediaRecorder: any;
import * as RecordRTC from 'recordrtc';
import { semillaInfo } from '../../../models/semillaInfo';
@Component({
  selector: 'step3',
  templateUrl:'./step3.component.html',
  styles: ['./step3.component.html']
})
export class Step3 implements OnInit {



  @Input() semilla: semillaInfo;
  @Output() semillaChange = new EventEmitter<semillaInfo>();
    private stream: MediaStream;
    private recordRTC: any;
    public isRecording:boolean;
    public interval:any;
    public timers=[]
    constructor(){

    }
    ngOnInit(){
      this.semilla.testimonialType = "audio"
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
      var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
      var options = {
              recorderType: StereoAudioRecorder
          };
          this.stream = stream;
          this.recordRTC = RecordRTC(stream, options);
          this.recordRTC.startRecording();
          let timer =0;
          var time_in_minutes = 5;
          var current_time = new Date();
          var deadline = new Date(current_time.getTime() + time_in_minutes*60*1000);
          
          this.interval = setInterval(()=>{
              var t =new Date(deadline.getTime() - new Date().getTime());
              var seconds = (Math.floor( (t.getTime()/1000) % 60 ))< 10 ? "0"+(Math.floor( (t.getTime()/1000) % 60 )) : (Math.floor( (t.getTime()/1000) % 60 ));
              var minutes = Math.floor( (t.getTime()/1000/60) % 60 );
              console.log(minutes+":"+seconds)
              this.timers[0]=minutes+":"+seconds;
             timer++;
              if(timer>300){
                  
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
          // this.semillasService.uploadFile("hola", recordedBlob)
          recordRTC.getDataURL(function (dataURL) { });

        }
}