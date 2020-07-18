import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginGuardGuard } from '../services/service.index';

import { RouterModule, Routes, CanActivate } from '@angular/router';

import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaginasComponent } from './paginas.component';



const paginasRoutes: Routes = [
  {
    path: '',
    component: PaginasComponent,
    canActivate: [LoginGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
      { path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'} },

      //CONFIGURACIONES:
      { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Configuración de usuario'} },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  }
];

export const PAGINAS_ROUTES = RouterModule.forChild( paginasRoutes);
