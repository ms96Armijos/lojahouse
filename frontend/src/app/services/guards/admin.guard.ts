import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router){}

  canActivate(){

    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);

    if (!this._usuarioService.estaLogueado() || tokenPayload.usuario.rol !== 'ADMINISTRADOR') {
      this.router.navigate(['/noautorizado']);
      return false;
    }
    return true;
  }



   /* if (this._usuarioService.usuario.rol === 'ADMINISTRADOR'){
      return true;
    }else{
      this.router.navigate(['/noautorizado']);
      //console.log('bloqueado por el ADMIN GUARD');
      return false;
    }
  }*/

}
