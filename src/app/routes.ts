import {HomeComponent} from './home/home.component';
import { MapComponent } from './map/map.component';


export const routes = [
    { path: '', component: HomeComponent, pathMatch: 'full'},
    { path:'map', component: MapComponent,pathMatch:'full'}
  ]