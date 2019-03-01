import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
declare const navigator: any;
declare const MediaRecorder: any;
import * as RecordRTC from 'recordrtc';
import { semillaInfo } from '../../../models/semillaInfo';
import { SemillasService } from '../../../services/semillas.service';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css', './percentage.css']
})
export class Step3 implements OnInit, OnDestroy {



  @Input() semilla: semillaInfo;
  @Output() semillaChange = new EventEmitter<semillaInfo>();
  private stream: MediaStream;
  private recordRTC: any;
  public isRecording: boolean;
  public interval: any;
  public timers = []
  public advance = [false, false, false, false]
  public blobs = []
  constructor(private semillasService: SemillasService, private storage: AngularFireStorage) {

  }
  ngOnInit() {
    //Set default type for testimonial AUDIO
    this.semilla.testimonialType = "audio"
    this.semilla.audios = ["","","",""]
  }
  ngOnDestroy(){
    this.stop()
  }

  overlay(){
    
    document.querySelector(".overlay").classList.add("display-none")
  }
  decider() {
    if (document.getElementById("icon").classList.contains("fa-spinner")
    ) {
      
      return;
    }
    else if (!this.isRecording) {
      document.getElementById("icon").classList.remove("fa-microphone")
      document.getElementById("icon").classList.add("fa-stop")
      document.getElementById("decider").classList.remove("record")
      document.getElementById("decider").classList.add("stop")
      this.record()
      
    } else if (this.isRecording) {
      document.getElementById("icon").classList.remove("fa-stop")
      document.getElementById("decider").classList.remove("stop")
      document.getElementById("icon").classList.add("fa-spinner", "fa-spin")
      document.getElementById("decider").classList.add("record")
      this.stop()
     
    }
  }
  public record() {
    if(document.getElementById("icon").classList.contains("fa-redo")){
      this.blobs.pop()
    }
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
    this.isRecording = false;
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(() => {
      this.processAudio()
    });
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    document.getElementById("audio").className = "";
    document.getElementById("audio").classList.add("c100")
    clearInterval(this.interval);

  }


  successCallback(stream: MediaStream) {

    let StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    let options = {
      recorderType: StereoAudioRecorder,
      disableLogs: true
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

  timing(deadline) {
    let bar = document.getElementById("audio")
    let t = new Date(deadline.getTime() - new Date().getTime());
    
    bar.classList.remove(`p${99 - (Math.floor((t.getTime() / 1000) / 3))}`)
    bar.classList.add(`p${100 - (Math.floor((t.getTime() / 1000) / 3))}`)

    let seconds = (Math.floor((t.getTime() / 1000) % 60)) < 10 ? "0" + (Math.floor((t.getTime() / 1000) % 60)) :
      (Math.floor((t.getTime() / 1000) % 60));

    let minutes = Math.floor((t.getTime() / 1000 / 60) % 60);
    
    this.timers[0] = minutes + ":" + seconds;
  }
  errorCallback() {
    //handle error here
  }

  processAudio() {
    document.getElementById("icon").classList.remove("fa-spinner", "fa-spin")
    document.getElementById("icon").classList.add("fa-redo")
    let recordRTC = this.recordRTC;
    var recordedBlob = recordRTC.getBlob();
    let audio: any = document.getElementById("player")
    audio.src = URL.createObjectURL(recordedBlob);
    this.blobs.push(recordedBlob);
  }

  upload() {
    this.advance[3] = true;
    let contador = 0;
    this.blobs.forEach((blob, index) => {
      let fileDir = `${this.semilla._id}/audio${index}`;
      let task = this.semillasService.uploadFile(fileDir, blob)
      let fileRef = this.storage.ref(fileDir)
      let snapshot = task.snapshotChanges();
      snapshot.pipe(finalize(() => {
        let downloadUrl = fileRef.getDownloadURL();
        downloadUrl.subscribe(url => {
          this.semilla.audios[index] = url
          contador++;
          if (contador == this.blobs.length) {
            this.crearSemilla();
          }
        })
      })).subscribe()

    })
  }

  crearSemilla() {
    this.semilla.step = 4;
    if (this.semilla.testimonialType == "audio") {
      this.semilla.textos = null;
    }else{
      this.semilla.audios = null;
    }
    this.semillasService.anadirSemilla(this.semilla);
  }


}