import {HomeComponent} from './home/home.component';
import { MapComponent } from './map/map.component';
import { TipoUser } from './registro/tipoUser.component/tipoUser.component';
import { CrearSemillaComponent } from './semilla/crearSemilla.component/crearSemilla.component';



export const routes = [
    { path: '', component: HomeComponent, pathMatch: 'full'},
    { path:'map', component: MapComponent,pathMatch:'full'},
    { path:'map/:id', component: MapComponent, pathMatch:'full'},
    { path: 'new', component: TipoUser, pathMatch:'full'},
    { path: 'new/data', component:CrearSemillaComponent, pathMatch:'full'}
  ]