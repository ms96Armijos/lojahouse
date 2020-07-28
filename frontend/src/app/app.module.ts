

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




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    RecuperarpasswordComponent,
    ControlVerPassDirective,
    ReseteopasswordComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PaginaModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
