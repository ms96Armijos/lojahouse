import { Servicio } from './../../modelos/servicio.model';
import { URL_SERVICIOS } from './../../config/config';
import { UsuarioService } from './../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ServiciosbasicosService {

  totalServicios = 0;

  constructor( public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarServicios(desde: number = 0) {
    const url = URL_SERVICIOS + '/servicio?desde=' + desde;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalServicios = resp.total;
        return resp.servicios;
      })
    );
  }

  crearServicio( servicio: Servicio){
    let url = URL_SERVICIOS + '/servicio';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, servicio)
    .pipe(
      map((resp: any) => {
        swal(
          'Servicio registrado!!',
          'Se ha registrado su servicio',
          'success'
        );
        return true;
      }),
      catchError((err) => {
        swal('Uppss...' + err.error.errors, ' Existen campos obligatorios vacíos', 'error');
        return throwError(err.error.mensaje);
      })
    );
  }


  obtenerServicio(id: string) {
    const url = URL_SERVICIOS + '/servicio/' + id;
    return this.http.get(url).pipe(map((resp: any) => resp.servicio));
  }


  buscarServicios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/servicios/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.servicios));
  }


  borrarServicio(id: string) {
    let url = URL_SERVICIOS + '/servicio/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(
      map((resp: any) => {
        swal(
          'Servicio eliminado',
          'Se ha eliminado el servicio',
          'success'
        );
        return true;
      }),
      catchError((err) => {
        swal(
          'Uppss...' + err.error.mensaje,
          ' No se ha podido eliminar el servicio',
          'error'
        );
        return throwError(err.error.mensaje);
      })
    );
  }


}
