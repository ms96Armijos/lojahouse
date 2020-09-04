import { Visita } from './../../modelos/visita.model';
import { VisitasService } from './../../services/visitas/visitas.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';


@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styles: [
  ]
})
export class VisitasComponent implements OnInit {

  visitas: Visita[] = [];
  desde = 0;


  constructor(public _serviceVisita: VisitasService,
    public toastr: ToastrService, public router: Router) { }

  ngOnInit(): void {
    this.cargarVisitas();
  }

  cargarVisitas() {
    this._serviceVisita.cargarVisitas(this.desde)
      .subscribe(visita => this.visitas = visita);
  }


  cambiarPaginacion(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this._serviceVisita.totalVisitas) {
      this.toastr.error('Solo existen ' + this._serviceVisita.totalVisitas + ' items', 'Ya no se puede avanzar más');
      return;
    }
    if (desde < 0) {
      this.toastr.error(this.desde + ' items para retroceder', 'Ya no se puede retroceder más');
      return;
    }
    this.desde += valor;
    this.cargarVisitas();
  }

  buscarVisitas(termino: string) {


    if (termino.length <= 0) {
      this.cargarVisitas();
      return;
    }
    this._serviceVisita.buscarVisitas(termino)
      .subscribe((visitas: Visita[]) => {
        console.log(termino);
        this.visitas = visitas;
      });

  }

  aceptarVisita(visita: Visita) {

    let estadoObtenido: string;

    if (visita.estado === '' || visita.estado === 'RECHAZADA') {
      estadoObtenido = 'ACEPTADA';


      swal({
        title: '¿Está seguro de realizar la siguiente acción?',
        text: 'La visita será: ' + estadoObtenido,
        icon: 'warning',
        buttons: [
          'Cancelar',
          'Aceptar'
        ],
        dangerMode: true,
      }).then(borrar => {
        if (borrar) {
          if (visita.estado === 'RECHAZADA') {
            visita.estado = 'ACEPTADA';
          }

          this._serviceVisita.aceptarVisita(visita)
            .subscribe();
          this.toastr.success('Visita ' + estadoObtenido);
        }
      });
    }else{
      this.toastr.warning('Ya está ' + visita.estado + ' la visita');
    }
  }

  rechazarVisita(visita: Visita) {

    let estadoObtenido: string;

    if (visita.estado === 'ACEPTADA') {
      estadoObtenido = 'RECHAZADA';

      swal({
        title: '¿Está seguro de realizar la siguiente acción?',
        text: 'La visita será: ' + estadoObtenido,
        icon: 'warning',
        buttons: [
          'Cancelar',
          'Aceptar'
        ],
        dangerMode: true,
      }).then(borrar => {
        if (borrar) {
          if (visita.estado === 'ACEPTADA') {
            visita.estado = 'RECHAZADA';
          }

          this._serviceVisita.aceptarVisita(visita)
            .subscribe();
          this.toastr.success('Visita ' + estadoObtenido);
        }
      });
    }else{
      this.toastr.warning('Ya está ' + visita.estado + ' la visita');
    }
  }

  borrarVisita( visita: Visita ){

    swal({
      title: '¿Está seguro de borrar la visita?',
      text: 'Está a punto de borrar la visita ',
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Eliminar'
      ],
      dangerMode: true,
    })
      .then(borrar => {
        if (borrar) {
          this._serviceVisita.borrarVisita(visita._id)
            .subscribe(borrado => {
              this.cargarVisitas();
            });
        }
      });

  }


}
