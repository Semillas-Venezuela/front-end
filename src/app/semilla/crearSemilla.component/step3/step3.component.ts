import {Component,OnInit, Input, Output, EventEmitter} from '@angular/core';
declare const navigator: any;
declare const MediaRecorder: any;
import * as RecordRTC from 'recordrtc';
import { semillaInfo } from '../../../models/semillaInfo';
import { SemillasService } from '../../../services/semillas.service';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Element } from '@angular/compiler';
@Component({
  selector: 'step3',
  templateUrl:'./step3.component.html',
  styleUrls: ['./step3.component.css','./percentage.css']
})
export class Step3 implements OnInit {



  @Input() semilla: semillaInfo;
  @Output() semillaChange = new EventEmitter<semillaInfo>();
    private stream: MediaStream;
    private recordRTC: any;
    public isRecording:boolean;
    public interval:any;
    public timers=[]
    constructor(private semillasService: SemillasService, private storage: AngularFireStorage){

    }
    ngOnInit(){
      this.semilla.testimonialType = "audio"
      this.semilla.audios={}
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
    document.getElementById("audio1").className ="";
    document.getElementById("audio1").classList.add("c100")
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
              var bar = document.getElementById("audio1")
              // document.querySelector("#audio1").classList.replace("","")
              var t =new Date(deadline.getTime() - new Date().getTime());
              console.log()
              bar.classList.remove(`p${99-(Math.floor((t.getTime()/1000)/3))}`)
              bar.classList.add(`p${100-(Math.floor((t.getTime()/1000)/3))}`)

              var seconds = (Math.floor( (t.getTime()/1000) % 60 ))< 10 ? "0"+(Math.floor( (t.getTime()/1000) % 60 )) : (Math.floor( (t.getTime()/1000) % 60 ));
              var minutes = Math.floor( (t.getTime()/1000/60) % 60 );
              console.log(minutes+":"+seconds)
              this.timers[0]=minutes+":"+seconds;
             timer++;
              if(timer>300){
                  
                  this.stop()
                  clearInterval(this.interval);
              }
          },1010)
          
        }
        errorCallback() {
          //handle error here
        }
      
        processVideo(audioVideoWebMURL) {
          
          let recordRTC = this.recordRTC;
          var recordedBlob = recordRTC.getBlob();
          console.log(recordedBlob);
          this.upload(recordedBlob)
          recordRTC.getDataURL(function (dataURL) { });

        }

        upload(blob){
          let downloadURL;
          let task = this.semillasService.uploadFile(this.semilla._id, blob)
          let snapshot   = task.snapshotChanges();
          snapshot.pipe(finalize(() => {
            downloadURL = this.storage.ref(this.semilla._id).getDownloadURL()
            downloadURL.subscribe(val => {
                  this.semilla.audios['audio1'] = val;              
            });
        })).subscribe();
        }


}