import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { LottieAnimationViewModule } from 'ng-lottie';


import { AppComponent } from './app-base/app.component';
import { HomeComponent } from './home/home.component';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { routes } from './routes';
import { MapComponent } from './map/map.component';
import { MenuComponent } from './menu/menu.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MapService } from './services/map.service';

import { TipoUser } from './registro/tipoUser.component/tipoUser.component';
import { HttpClientModule } from '@angular/common/http';
import { SemillasService } from './services/semillas.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";

import { FormsModule } from "@angular/forms";
import { AuthService } from './services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Step1 } from './semilla/crearSemilla.component/step1/step1.component';
import { Step2 } from './semilla/crearSemilla.component/step2/step2.component';
import { Step3 } from './semilla/crearSemilla.component/step3/step3.component';
import { CrearSemillaComponent } from './semilla/crearSemilla.component/crearSemilla.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { DeviceDetectorModule } from 'ngx-device-detector';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    MenuComponent,
    TipoUser,
    CrearSemillaComponent,
    Step1,
    Step2,
    Step3,
    ReversePipe,
    
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(routes),
    TransferHttpCacheModule,
    LottieAnimationViewModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    DeviceDetectorModule.forRoot()
   
  ],
  providers: [MapService, SemillasService, AngularFireStorage, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
