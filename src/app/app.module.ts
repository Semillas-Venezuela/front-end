import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgxOAuthModule} from 'ngx-oauth-client';

import { AppComponent } from './app-base/app.component';
import { HomeComponent } from './home/home.component';
import {TransferHttpCacheModule} from '@nguniversal/common';
import { routes } from './routes';
import { MapComponent } from './map/map.component';
import { MenuComponent } from './menu/menu.component';

import { MapService } from './services/map.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    MenuComponent

  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(routes),
    TransferHttpCacheModule,
    NgxOAuthModule
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
