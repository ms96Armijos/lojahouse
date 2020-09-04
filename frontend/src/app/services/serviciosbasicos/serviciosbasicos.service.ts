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

  servicio: Servicio;
  totalServicios = 0;

  constructor( public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarServicios(desde: number = 0) {
    let url = URL_SERVICIOS + '/servicio/allservicios/' + desde;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalServicios = resp.total;
        this.servicio = resp.servicios;
        return resp.servicios;
      })
    );
  }

  crearServicio( servicio: Servicio){
    let url = URL_SERVICIOS + '/servicio';

    //SI EXISTE EL ID, ACTUALIZA EL SERVICIO
    if ( servicio._id){
      url += '/' + servicio._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, servicio )
      .pipe(map( (resp: any ) => {
        swal(
          'Servicio actualizado!!',
          'Se ha actualizado su servicio',
          'success'
        );
        return true;
      }),
      catchError((err) => {
        swal('Uppss...' + '', ' Debes ingresar el nombre del servicio', 'error');
        return throwError(err.error.mensaje);
      }));

    }else{
//SI NO EXISTE EL ID, CREA UN NUEVO SERVICIO
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
          swal('Uppss...' + '', ' El servicio: ' + servicio.nombre + ' ya existe, ingresa uno diferente', 'error');
          return throwError(err.error.mensaje);
        })
      );
    }
  }


  /**actualizarServicio( servicio: Servicio){
    let url = URL_SERVICIOS + '/servicio' + servicio._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, servicio )
    .pipe(map( (resp: any ) => resp.servicio));
  }*/


  obtenerServicio(id: string) {
    let url = URL_SERVICIOS + '/servicio/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(map((resp: any) => resp.servicio));
  }


  buscarServicios(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/servicios/' + termino;
    url += '?token=' + this._usuarioService.token;
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
