
import { RouterModule, Routes } from '@angular/router';

import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaginasComponent } from './paginas.component';



const paginasRoutes: Routes = [
  {
    path: '',
    component: PaginasComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  }
];

export const PAGINAS_ROUTES = RouterModule.forChild( paginasRoutes);
