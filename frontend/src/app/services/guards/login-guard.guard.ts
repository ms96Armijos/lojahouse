import { UsuarioService } from './../usuario/usuario.service';

import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()

export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router){}

  canActivate() {

    if (this._usuarioService.estaLogueado()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
    //console.log('Pasando por el login guard');
    return true;
  }
}
