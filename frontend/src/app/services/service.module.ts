import { InmueblesService } from '../services/service.index';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedService, SidebarService, UsuarioService, LoginGuardGuard, AdminGuard, ArrendadorGuard,
   SubirArchivoService, ServiciosbasicosService } from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    ArrendadorGuard,
    SubirArchivoService,
    InmueblesService,
    ServiciosbasicosService
  ],
})
export class ServiceModule {}
