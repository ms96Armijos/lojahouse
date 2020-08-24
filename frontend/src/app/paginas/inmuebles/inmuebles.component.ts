import { InmueblesService } from './../../services/service.index';
import { Inmueble } from './../../modelos/inmueble.model';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert';


@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styles: [
  ]
})
export class InmueblesComponent implements OnInit {

  //inmueble: any;
  inmuebles: Inmueble[] = [];
  imagenTemporal: string;
  desde = 0;


  constructor(public _inmuebleService: InmueblesService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.cargarInmuebles();
  }


  cargarInmuebles() {
    this._inmuebleService.cargarInmuebles(this.desde)
      .subscribe(inmuebles => this.inmuebles = inmuebles);
  }

  cambiarPaginacion(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this._inmuebleService.totalInmuebles) {
      this.toastr.error('Solo existen ' + this._inmuebleService.totalInmuebles + ' items', 'Ya no se puede avanzar más');
      return;
    }
    if (desde < 0) {
      this.toastr.error(this.desde + ' items para retroceder', 'Ya no se puede retroceder más');
      return;
    }


    this.desde += valor;
    this.cargarInmuebles();
  }


  buscarInmuebles(termino: string) {

    if (termino.length <= 0) {
      this.cargarInmuebles();
      return;
    }
    this._inmuebleService.buscarInmuebles(termino)
      .subscribe(inmuebles => this.inmuebles = inmuebles);

  }

  borrarInmueble(inmueble: Inmueble) {

    swal({
      title: '¿Está seguro de borrar el inmueble?',
      text: 'Está a punto de borrar a: ' + inmueble.nombre,
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Eliminar'
      ],
      dangerMode: true,
    })
      .then(borrar => {
        if (borrar) {
          this._inmuebleService.borrarInmueble(inmueble._id)
            .subscribe(borrado => {
              this.cargarInmuebles();
            });
        }
      });

  }


  publicarInmueble(inmueble: Inmueble) {

    let estadoObtenido: string;

    if (inmueble.publicado === '1') {
      estadoObtenido = 'No público';
    } else {
      estadoObtenido = 'Publicado';
    }

    swal({
      title: '¿Está seguro de realizar la siguiente acción?',
      text: 'El inmueble estará: ' + estadoObtenido,
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Aceptar'
      ],
      dangerMode: true,
    }).then(borrar => {
      if (borrar) {
        if (inmueble.publicado === '1') {
          inmueble.publicado = '0';
        } else {
          inmueble.publicado = '1';
        }

        this._inmuebleService.publicarInmueble(inmueble)
          .subscribe();
        this.toastr.success('Inmueble ' + estadoObtenido);
      }
    });
  }


  /*verInmueble( inmueble: Inmueble, modal: any ){
    this.inmueble = inmueble;
    this.servicioModal.open(modal);
  }*/

}
