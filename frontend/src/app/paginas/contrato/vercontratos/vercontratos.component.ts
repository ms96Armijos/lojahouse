
import { Router } from '@angular/router';
import { ContratoService } from './../../../services/contrato/contrato.service';
import { Component, OnInit } from '@angular/core';
import { Contrato } from '../../../modelos/contrato.model';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert';

@Component({
  selector: 'app-vercontratos',
  templateUrl: './vercontratos.component.html',
  styles: []
})
export class VercontratosComponent implements OnInit {

  constructor(public _contratoService: ContratoService, public toastr: ToastrService, public router: Router) { }

  contratos: Contrato[] = [];
  desde = 0;

  ngOnInit(): void {
    this.cargarContratos();
  }

  cargarContratos(){
    this._contratoService.cargarContratos(this.desde)
    .subscribe( contratos => {this.contratos = contratos});
  }


  buscarContratos(termino: string){


    if ( termino.length <= 0 ){
      this.cargarContratos();
      return;
    }
    this._contratoService.buscarContratos( termino )
    .subscribe( contratos => this.contratos = contratos);

  }

  cambiarPaginacion(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this._contratoService.totalContratos) {
      this.toastr.error('Solo existen ' + this._contratoService.totalContratos + ' items', 'Ya no se puede avanzar más');
      return;
    }
    if (desde < 0) {
      this.toastr.error(this.desde + ' items para retroceder', 'Ya no se puede retroceder más');
      return;
    }
    this.desde += valor;
    this.cargarContratos();
  }

  borrarContrato( contrato: Contrato ){

    swal({
      title: '¿Está seguro de borrar el contrato?',
      text: 'Está a punto de borrar el contrato',
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Eliminar'
      ],
      dangerMode: true,
    })
      .then(borrar => {
        if (borrar) {
          this._contratoService.borrarContrato(contrato._id)
            .subscribe(borrado => {
              this.cargarContratos();
            });
        }
      });

  }

}
