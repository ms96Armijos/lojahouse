import { InmueblesService } from './../inmueble/inmuebles.service';
import { Observable } from 'rxjs';
import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsuarioactivoGuard implements CanActivate {

  autorizado: boolean;

  token;
  tokenPayload;

  constructor(public _inmuebleService: InmueblesService, public _usuarioService: UsuarioService, public router: Router){

  }


  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      this.token = localStorage.getItem('token');
    this.tokenPayload = decode(this.token);

    let url: string = state.url;

    console.log('retorno '+ this.obtenerInmueble(url.split('/')[2]));

     return this.obtenerInmueble(url.split('/')[2]);
  }


  obtenerInmueble(id: string) {

    this._inmuebleService.obtenerInmueble(id)
      .subscribe(inmueble => {

        console.log('auth: '+ this.tokenPayload.usuario._id+' inmueble '+inmueble.usuario.estado);

        if (this.tokenPayload.usuario._id === inmueble.usuario._id &&
          inmueble.usuario.estado === '1' &&
          this.tokenPayload.usuario.rol === 'ARRENDADOR') {

          this.autorizado = true;
        } else {
          this.router.navigate(['/noautorizado']);
          //console.log('bloqueado por el ADMIN GUARD');
          this.autorizado = false;
        }
      });

      return this.autorizado;

  }
  }

