import { URL_SERVICIOS } from './../../config/config';
import { Visita } from './../../modelos/visita.model';
import { UsuarioService } from './../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VisitasService {


  visita: Visita;
  totalVisitas = 0;

  constructor( public http: HttpClient, public _usuarioService: UsuarioService ) {  }

  cargarVisitas(desde: number = 0) {
    const url = URL_SERVICIOS + '/visita?desde=' + desde;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalVisitas = resp.total;
        this.visita = resp.visitas;
        return resp.visitas;
      })
    );
  }


  obtenerVisita(id: string) {
    const url = URL_SERVICIOS + '/visita/' + id;
    return this.http.get(url).pipe(map((resp: any) => resp.visitas));
  }

  buscarVisitas(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/visitas/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.visitas));
  }

}


