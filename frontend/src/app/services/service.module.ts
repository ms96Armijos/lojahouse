import { InmueblesService } from '../services/service.index';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedService, SidebarService, UsuarioService, LoginGuardGuard, SubirArchivoService, ServiciosbasicosService } from './service.index';
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
    SubirArchivoService,
    InmueblesService,
    ServiciosbasicosService
  ],
})
export class ServiceModule {}
