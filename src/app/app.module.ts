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

import { MapService } from './services/map.service';

import { TipoUser } from './registro/tipoUser.component/tipoUser.component';

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
    LottieAnimationViewModule
   
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
