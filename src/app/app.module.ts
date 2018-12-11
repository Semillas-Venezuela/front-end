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
import { oAuth } from './services/oAuth';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    MenuComponent,
    TipoUser

  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(routes),
    TransferHttpCacheModule,
    LottieAnimationViewModule,
    HttpClientModule
   
  ],
  providers: [MapService,oAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
