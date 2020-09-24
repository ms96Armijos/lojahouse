import { Inmueble } from './../../modelos/inmueble.model';
import { InmueblesService } from './../inmueble/inmuebles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ArrendadorGuard implements CanActivate {


  autorizado: boolean;

   token;
   tokenPayload;


  constructor(public _inmuebleService: InmueblesService, public _usuarioService: UsuarioService, public router: Router) {

   }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      this.token = localStorage.getItem('token');
      this.tokenPayload = decode(this.token);

    let url: string = state.url;

    console.log('retorno '+ this.obtenerInmueble(url.split('/')[2]));

     return this.obtenerInmueble(url.split('/')[2]);


    /*if (this._usuarioService.usuario.rol === 'ADMINISTRADOR' || this._usuarioService.usuario.rol === 'ARRENDADOR'){
      return true;
    }else{
      this.router.navigate(['/noautorizado']);
      //console.log('bloqueado por el ADMIN GUARD');
      return false;
    }*/
  }

  obtenerInmueble(id: string) {

    this._inmuebleService.obtenerInmueble(id)
      .subscribe(inmueble => {

        console.log('auth: '+ this.tokenPayload.usuario._id+' inmueble '+inmueble.usuario._id);

        if (this.tokenPayload.usuario._id === inmueble.usuario._id &&
          this.tokenPayload.usuario.rol === 'ARRENDADOR' ||
          this.tokenPayload.usuario.rol === 'ADMINISTRADOR') {

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
