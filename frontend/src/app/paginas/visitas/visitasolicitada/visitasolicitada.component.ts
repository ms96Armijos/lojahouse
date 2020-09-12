import { VisitasarrendatarioService } from './../../../services/visitas/visitasarrendatario.service';
import { Visita } from './../../../modelos/visita.model';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visitasolicitada',
  templateUrl: './visitasolicitada.component.html',
  styles: [
  ]
})
export class VisitasolicitadaComponent implements OnInit {

  visitas: Visita[] = [];
  desde = 0;

  constructor(public _visitaArrendatarioService: VisitasarrendatarioService,  public toastr: ToastrService) { }

  ngOnInit(): void {
    this.cargarSolicitudesArrendatario();
  }

  cargarSolicitudesArrendatario(){
    this._visitaArrendatarioService.cargarVisitasArrendatario(this.desde)
    .subscribe( visitas => this.visitas = visitas);
  }


  cambiarPaginacion(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this._visitaArrendatarioService.totalSolicitudVisitas) {
      this.toastr.error('Solo existen ' + this._visitaArrendatarioService.totalSolicitudVisitas + ' items', 'Ya no se puede avanzar más');
      return;
    }
    if (desde < 0) {
      this.toastr.error(this.desde + ' items para retroceder', 'Ya no se puede retroceder más');
      return;
    }
    this.desde += valor;
    this.cargarSolicitudesArrendatario();
  }

  buscarSolicitudesArrendatario(termino: string){

    if ( termino.length <= 0 ){
      this.cargarSolicitudesArrendatario();
      return;
    }
    this._visitaArrendatarioService.buscarVisitasArrendatario( termino )
    .subscribe( visitas => this.visitas = visitas);

  }

}
