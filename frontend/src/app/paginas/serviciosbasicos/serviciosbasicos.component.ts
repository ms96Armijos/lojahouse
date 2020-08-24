import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ServiciosbasicosService } from './../../services/serviciosbasicos/serviciosbasicos.service';
import { Servicio } from './../../modelos/servicio.model';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert';


@Component({
  selector: 'app-serviciosbasicos',
  templateUrl: './serviciosbasicos.component.html',
  styles: [
  ]
})
export class ServiciosbasicosComponent implements OnInit {

  servicios: Servicio[] = [];
  desde = 0;

  constructor(public _basicosService: ServiciosbasicosService,
      public toastr: ToastrService, public router: Router) {}

  ngOnInit(): void {
    this.cargarServicios();
  }


  cargarServicios(){
    this._basicosService.cargarServicios(this.desde)
    .subscribe( servicios => this.servicios = servicios);
  }


  /*crearServicio(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

   const servicio = new Servicio( forma.value.nombre );

    this._basicosService.crearServicio(servicio)
      .subscribe(resp => {
        this.router.navigate(['/servicios']);
      });
  }*/


  cambiarPaginacion(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this._basicosService.totalServicios) {
      this.toastr.error('Solo existen ' + this._basicosService.totalServicios + ' items', 'Ya no se puede avanzar más');
      return;
    }
    if (desde < 0) {
      this.toastr.error(this.desde + ' items para retroceder', 'Ya no se puede retroceder más');
      return;
    }
    this.desde += valor;
    this.cargarServicios();
  }

  buscarServicios(termino: string){


    if ( termino.length <= 0 ){
      this.cargarServicios();
      return;
    }
    this._basicosService.buscarServicios( termino )
    .subscribe( servicios => this.servicios = servicios);

  }

  borrarServicio( servicio: Servicio ){

    swal({
      title: '¿Está seguro de borrar el servicio?',
      text: 'Está a punto de borrar el servicio: ' + servicio.nombre,
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Eliminar'
      ],
      dangerMode: true,
    })
      .then(borrar => {
        if (borrar) {
          this._basicosService.borrarServicio(servicio._id)
            .subscribe(borrado => {
              this.cargarServicios();
            });
        }
      });

  }

}
