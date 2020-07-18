

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
import { RecuperarpasswordComponent } from './login/recuperarpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    RecuperarpasswordComponent
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
