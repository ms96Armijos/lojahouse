import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

//PIPE MODULO
import { PipesModule } from './../pipes/pipes.module';


import { PAGINAS_ROUTES } from './paginas.routes';
import { PaginasComponent } from './paginas.component';
import { ShareModule } from './../shared/shared.module';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { UsuariosComponent } from './usuarios/usuarios.component';


@NgModule({
  declarations: [
    PaginasComponent,
    DashboardComponent,
    ProgressComponent,
    PerfilComponent,
    UsuariosComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent
  ],
  imports: [
    ShareModule,
    PAGINAS_ROUTES,
    PipesModule,
    FormsModule,
    CommonModule
  ]
})
export class PaginaModule {}
