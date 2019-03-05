import {HomeComponent} from './home/home.component';
import { MapComponent } from './map/map.component';
import { TipoUser } from './registro/tipoUser.component/tipoUser.component';
import { CrearSemillaComponent } from './semilla/crearSemilla.component/crearSemilla.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { AdminComponent } from './admin/admin.component';
import { LoginAdminComponent } from './admin/loginAdmin/login.component';
import { AuthGuard } from './guards/admin.guard';



export const routes = [
    { path: '', component: HomeComponent, pathMatch: 'full'},
    { path:'map', component: MapComponent,pathMatch:'full'},
    { path:'map/:id', component: MapComponent, pathMatch:'full'},
    { path: 'new', component: CrearSemillaComponent, pathMatch:'full'},
    { path: 'new/data', component:CrearSemillaComponent, pathMatch:'full'},
    { path: 'nosotros', component: NosotrosComponent, pathMatch:'full'},
    { path: 'approval', component: AdminComponent, pathMatch:'full', canActivate: [AuthGuard]},
    { path: 'adminLogin', component:LoginAdminComponent,pathMatch:'full'}
  ]