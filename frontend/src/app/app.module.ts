

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//RUTAS
import { APP_ROUTES } from './app-routing.module';


//MODULOS
import { PaginaModule } from './paginas/paginas.module';


//SERVICIOS
import { ServiceModule } from './services/service.module';


//COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './login/registro.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecuperarpasswordComponent } from './login/cambiarpassword.component';
import { ControlVerPassDirective } from './login/control-ver-pass.directive';
import { ReseteopasswordComponent } from './login/reseteopassword/reseteopassword.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrincipalComponent } from './principal/principal/principal.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    RecuperarpasswordComponent,
    ControlVerPassDirective,
    ReseteopasswordComponent,
    PrincipalComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PaginaModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceModule,
    NgbModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
