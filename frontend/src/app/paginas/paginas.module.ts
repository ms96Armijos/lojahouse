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
import { CrearservicioComponent } from './serviciosbasicos/crearservicio/crearservicio.component';
import { VisitasComponent } from './visitas/visitas.component';
import { VervisitasarrendatarioComponent } from './visitas/vervisitasArrendatario/vervisitasarrendatario.component';
import { PlantillaComponent } from './contrato/plantilla/plantilla.component';
import { NuevoComponent } from './contrato/nuevo/nuevo.component';
import { VercontratosComponent } from './contrato/vercontratos/vercontratos.component';
import { InmuebleComponent } from './alquilar/inmueble/inmueble.component';
import { CrearvisitaComponent } from './visitas/crearvisita/crearvisita/crearvisita.component';
import { VisitasolicitadaComponent } from './visitas/visitasolicitada/visitasolicitada.component';
import { PublicadosComponent } from './alquilar/publicados/publicados.component';
import { ContratoarrendatarioComponent } from './contrato/contratoarrendatario/contratoarrendatario.component';


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
    CrearservicioComponent,
    VisitasComponent,
    VervisitasarrendatarioComponent,
    PlantillaComponent,
    NuevoComponent,
    VercontratosComponent,
    InmuebleComponent,
    CrearvisitaComponent,
    VisitasolicitadaComponent,
    PublicadosComponent,
    ContratoarrendatarioComponent,
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
    ReactiveFormsModule,
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
