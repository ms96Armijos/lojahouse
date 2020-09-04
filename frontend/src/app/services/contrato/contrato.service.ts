import { Router } from '@angular/router';
import { URL_SERVICIOS } from './../../config/config';
import { UsuarioService } from './../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Contrato } from './../../modelos/contrato.model';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  contrato: Contrato;
  totalContratos = 0;

  constructor(
    public router: Router, public http: HttpClient, public _usuarioService: UsuarioService) { }

  crearContrato(contrato: Contrato) {
    const url = URL_SERVICIOS + '/contrato' + '?token=' + this._usuarioService.token;

    return this.http.post(url, contrato).pipe(
      map((resp: any) => {
        swal(
          'Tu contrato ha sido creado\n',
          'success'
        );
        this.router.navigate(['/plantillacontrato', resp.contrato._id]);
        return true;
      }),
      catchError((err) => {
        swal('Uppss...' + err.error.mensaje, ' Existen campos obligatorios vacíos', 'error');
        return throwError(err.error.mensaje);
      })
    );
  }



  cargarContratos(desde: number = 0) {
    let url = URL_SERVICIOS + '/contrato/allcontratos/desde=' + desde;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalContratos = resp.total;
        this.contrato = resp.contratos;
        return resp.contratos;
      })
    );
  }
  obtenerContrato(id: string) {
    let url = URL_SERVICIOS + '/contrato/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(map((resp: any) => resp.contrato));
  }


  borrarContrato(id: string) {
    let url = URL_SERVICIOS + '/contrato/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(
      map((resp: any) => {
        swal(
          'Contrato eliminado',
          'Se ha eliminado el contrato',
          'success'
        );
        return true;
      }),
      catchError((err) => {
        swal(
          'Uppss...' + err.error.mensaje,
          ' No se ha podido eliminar el contrato',
          'error'
        );
        return throwError(err.error.mensaje);
      })
    );
  }

  buscarContratos(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/contratos/' + termino;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.contratos));
  }

}
