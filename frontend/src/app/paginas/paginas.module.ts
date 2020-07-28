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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { InterceptorService } from '../interceptors/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    PaginasComponent,
    DashboardComponent,
    ProgressComponent,
    PerfilComponent,
    UsuariosComponent,
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
