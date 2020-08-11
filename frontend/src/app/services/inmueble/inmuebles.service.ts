import { Inmueble } from './../../modelos/inmueble.model';
import { UsuarioService } from './../usuario/usuario.service';
import { URL_SERVICIOS } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root',
})
export class InmueblesService {
  totalInmuebles = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarInmuebles(desde: number = 0) {
    const url = URL_SERVICIOS + '/inmueble?desde=' + desde;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalInmuebles = resp.total;
        return resp.inmuebles;
      })
    );
  }

  obtenerInmueble(id: string) {
    const url = URL_SERVICIOS + '/inmueble/' + id;
    return this.http.get(url).pipe(map((resp: any) => resp.inmueble));
  }

  borrarInmueble(id: string) {
    let url = URL_SERVICIOS + '/inmueble/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(
      map((resp: any) => {
        swal(
          'Inmueble eliminado',
          'Se ha eliminado el bien inmueble',
          'success'
        );
        return true;
      }),
      catchError((err) => {
        swal(
          'Uppss...' + err.error.mensaje,
          ' No se ha podido eliminar el inmuebele',
          'error'
        );
        return throwError(err.error.mensaje);
      })
    );
  }

  crearInmueble( inmueble: Inmueble){
    let url = URL_SERVICIOS + '/inmueble';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, inmueble)
    .pipe(
      map((resp: any) => {
        swal(
          'Inmueble registrado!!',
          'Se ha registrado su bien inmueble',
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

  buscarInmuebles(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/inmuebles/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.inmuebles));
  }

  actualizarInmueble( inmueble: Inmueble){
    let url = URL_SERVICIOS + '/inmueble' + inmueble._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, inmueble )
    .pipe(map( (resp: any ) => resp.inmueble));
  }

}