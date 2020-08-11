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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { InterceptorService } from '../interceptors/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InmueblesComponent } from './inmuebles/inmuebles.component';
import { CrearinmuebleComponent } from './inmuebles/crearinmueble/crearinmueble.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ServiciosbasicosComponent } from './serviciosbasicos/serviciosbasicos.component';


@NgModule({
  declarations: [
    PaginasComponent,
    DashboardComponent,
    ProgressComponent,
    PerfilComponent,
    UsuariosComponent,
    InmueblesComponent,
    CrearinmuebleComponent,
    ServiciosbasicosComponent,
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
    CommonModule,
    DragDropModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class PaginaModule {}
