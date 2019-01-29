import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css', './percentage.css']
})
export class Step3 implements OnInit {



  @Input() semilla: semillaInfo;
  @Output() semillaChange = new EventEmitter<semillaInfo>();
  private stream: MediaStream;
  private recordRTC: any;
  public isRecording: boolean;
  public interval: any;
  public timers = []
  public advance=[false,false,false,false]
  constructor(private semillasService: SemillasService, private storage: AngularFireStorage) {

  }
  ngOnInit() {
    this.semilla.testimonialType = "audio"
    this.semilla.audios = {}
  }
  decider(){
    if(document.getElementById("icon").classList.contains("fa-spinner")
    ){
      return;
    }
    else if(!this.isRecording){
      document.getElementById("icon").classList.remove("fa-microphone")
      document.getElementById("icon").classList.add("fa-stop")
      document.getElementById("decider").classList.remove("record")
      document.getElementById("decider").classList.add("stop")
      this.record()
    }else if(this.isRecording){
      this.stop()
    }
  }
  public record() {
    this.isRecording = true;
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));

  }

  public stop() {
    document.getElementById("decider").classList.remove("stop")
    document.getElementById("decider").classList.add("record")
    document.getElementById("icon").classList.remove("fa-stop")
    document.getElementById("icon").classList.add("fa-spinner","fa-spin")
    this.isRecording = false;
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
    document.getElementById("audio").className = "";
    document.getElementById("audio").classList.add("c100")
    clearInterval(this.interval);
    
  }


  successCallback(stream: MediaStream) {

    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    var options = {
      recorderType: StereoAudioRecorder
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    
    this.recordRTC.startRecording();
    let timer = 0;
    let time_in_minutes = 5;
    let current_time = new Date();
    let deadline = new Date(current_time.getTime() + time_in_minutes * 60 * 1000);

    this.interval = setInterval(() => {
      timer++;
      if (timer >= 300) {
        clearInterval(this.interval);
        this.stop()
        
      }
      this.timing(deadline)
      
     
    }, 1001)

  }

  timing(deadline){
    let bar = document.getElementById("audio")
      let t = new Date(deadline.getTime() - new Date().getTime());
      console.log()
      bar.classList.remove(`p${99 - (Math.floor((t.getTime() / 1000) / 3))}`)
      bar.classList.add(`p${100 - (Math.floor((t.getTime() / 1000) / 3))}`)

      let seconds = (Math.floor((t.getTime() / 1000) % 60)) < 10 ? "0" + (Math.floor((t.getTime() / 1000) % 60)) : 
      (Math.floor((t.getTime() / 1000) % 60));

      let minutes = Math.floor((t.getTime() / 1000 / 60) % 60);
      console.log(minutes + ":" + seconds)
      this.timers[0] = minutes + ":" + seconds;
  }
  errorCallback() {
    //handle error here
  }

  processVideo() {

    let recordRTC = this.recordRTC;
    var recordedBlob = recordRTC.getBlob();
    let audio:any = document.getElementById("player")
    audio.src = URL.createObjectURL(recordedBlob);
    console.log(recordedBlob);
    this.upload(recordedBlob)
    recordRTC.getDataURL(function (dataURL) { });

  }

  upload(blob) {
    let downloadURL;
    let audioString = !this.advance[0] ? "audio0" :this.advance[0]&& !this.advance[1]? "audio1":this.advance[1]&& !this.advance[2]? "audio2": this.advance[2] && !this.advance[3]? "audio3":"nothing";
    let task = this.semillasService.uploadFile(this.semilla._id+"/"+audioString, blob)
    let snapshot = task.snapshotChanges();
    snapshot.pipe(finalize(() => {
      downloadURL = this.storage.ref(this.semilla._id+"/"+audioString).getDownloadURL()
      downloadURL.subscribe(val => {
        this.semilla.audios[audioString] = val;
        document.getElementById("icon").classList.remove("fa-spinner","fa-spin"),
        document.getElementById("icon").classList.add("fa-redo")
      });
    })).subscribe();
  }

  crearSemilla() {
    console.log(this.semilla)
    this.semilla.textos = null;
    this.advance[3]=true;
    this.semillasService.anadirSemilla(this.semilla).then(
        () => {
            console.log("Semilla creada");
        }
    )
}
}