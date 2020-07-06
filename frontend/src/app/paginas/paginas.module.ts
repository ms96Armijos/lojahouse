import { NgModule } from "@angular/core";

import { PAGINAS_ROUTES } from './paginas.routes';
import { PaginasComponent } from './paginas.component';
import { ShareModule } from './../shared/shared.module';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    PaginasComponent,
    DashboardComponent,
    ProgressComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent
  ],
  imports: [
    ShareModule,
    PAGINAS_ROUTES
  ]
})
export class PaginaModule {}
