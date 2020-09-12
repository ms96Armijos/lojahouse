import { URL_SERVICIOS } from './../../config/config';
import { UsuarioService } from './../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Visita } from './../../modelos/visita.model';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisitasarrendatarioService {

  visita: Visita;
  totalSolicitudVisitas = 0;


  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarVisitasArrendatario(desde: number = 0) {
    let url = URL_SERVICIOS + '/visitasolicitada/' + desde;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalSolicitudVisitas = resp.total;
        this.visita = resp.visitas;
        return resp.visitas;
      })
    );
  }

  buscarVisitasArrendatario(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/visitasarrendatario/' + termino;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.visitasarrendatario));
  }

}
