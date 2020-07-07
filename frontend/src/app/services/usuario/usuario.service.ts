import { Usuario } from './../../modelos/usuario.model';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { from } from 'rxjs';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) {
    console.log('Servicio de usuario listo');
  }

  login(usuario: Usuario){
    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
    .pipe(map( (resp: any) => {

      swal('Bienvenido!', 'success');
  }));
  }


  crearUsuario( usuario: Usuario){
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
    .pipe(map( (resp: any) => {
      swal('Tu cuenta ha sido creada\n' + usuario.nombre, 'Se ha enviado la contraseña a tu correo electrónico', 'success');
  }));
  }
}
