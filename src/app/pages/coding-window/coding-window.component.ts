import { Component, Inject } from '@angular/core';
import { ProblemStatementComponent } from '../problem-statement/problem-statement.component';
import uitoolkit from "@zoom/videosdk-ui-toolkit";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, DOCUMENT } from '@angular/common';
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-coding-window',
  standalone: true,
  imports: [ProblemStatementComponent, CommonModule,
    HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './coding-window.component.html',
  styleUrl: './coding-window.component.css'
})
export class CodingWindowComponent {

  sessionContainer: any;
  authEndpoint = 'http://localhost:4000'
  displayPopup: boolean = false;
  inSession: boolean = false
  doubleClick: boolean = false
  enableSessionForm: boolean = false;
  config = {
    videoSDKJWT: '',
    sessionName: 'HackMidwest',
    userName: 'Naveen',
    sessionPasscode: '17402487',
    features: ['preview', 'video', 'audio', 'settings', 'users', 'chat', 'share'],
    options: { init: {}, audio: {}, video: {}, share: {}},
    virtualBackground: {
       allowVirtualBackground: true,
       allowVirtualBackgroundUpload: true,
       virtualBackgrounds: ['https://images.unsplash.com/photo-1715490187538-30a365fa05bd?q=80&w=1945&auto=format&fit=crop']
    }
  };
  role = 1
  form: FormGroup;
  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document: any, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {

  }

  startNewSession() {
    this.sessionContainer = document.getElementById('sessionContainer')
    this.displayPopup = false;
    this.inSession = true

    this.httpClient.post(this.authEndpoint, {
	    sessionName:  this.config.sessionName,
      role: this.role,
    }).subscribe((data: any) => {
      if(data.signature) {
        console.log(data.signature)
        this.config.videoSDKJWT = data.signature
        this.joinSession()
      } else {
        console.log(data)
      }
    })
  }

  enableForm(){
    this.enableSessionForm = true;
  }

  joinExixtingSession() {
    this.sessionContainer = document.getElementById('sessionContainer')
    this.displayPopup = false;
    this.inSession = true

    this.httpClient.post(this.authEndpoint, {
	    sessionName:  this.config.sessionName,
      role: this.role,
    }).subscribe((data: any) => {
      if(data.signature) {
        console.log(data.signature)
        this.config.videoSDKJWT = data.signature
        this.joinSession()
      } else {
        console.log(data)
      }
    })
  }

  joinSession() {
    uitoolkit.joinSession(this.sessionContainer, this.config)

    uitoolkit.onSessionClosed(this.sessionClosed)
  }

  sessionClosed = (() => {
    console.log('session closed')
    uitoolkit.closeSession(this.sessionContainer)
    this.inSession = false
  })

  start(): void{
    this.displayPopup = true
  }

  close(): void {
    this.displayPopup = false;
    this.enableSessionForm = false;
    this.form.reset();
  }

  onSubmit(){
    this.config.sessionName = this.form.get("name")?.value;
    this.config.sessionPasscode = this.form.get("password")?.value;
    this.joinExixtingSession();
  }

  toggleScreen(){
    this.doubleClick = !this.doubleClick;
  }
}
