import { ServiciosbasicosComponent } from './serviciosbasicos/serviciosbasicos.component';
import { CrearinmuebleComponent } from './inmuebles/crearinmueble/crearinmueble.component';
import { InmueblesComponent } from './inmuebles/inmuebles.component';
import { RecuperarpasswordComponent } from '../login/cambiarpassword.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginGuardGuard } from '../services/service.index';

import { RouterModule, Routes, CanActivate } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PaginasComponent } from './paginas.component';



const paginasRoutes: Routes = [
  {
    path: '',
    component: PaginasComponent,
    canActivate: [LoginGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: {titulo: 'ARRENDADOR'} },
      { path: 'inmuebles', component: InmueblesComponent, data: {titulo: 'Gestión de Inmuebles'} },
      { path: 'crearinmueble', component: CrearinmuebleComponent, data: {titulo: 'Crear Inmueble'} },
      { path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'} },
      { path: 'cambiarpassword', component: RecuperarpasswordComponent, data: {titulo: 'Cambiar Contraseña'} },

      //CONFIGURACIONES:
      { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Configuración de usuario'} },
      { path: 'servicios', component: ServiciosbasicosComponent, data: {titulo: 'Configuración de servicios'} },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  }
];

export const PAGINAS_ROUTES = RouterModule.forChild( paginasRoutes);
