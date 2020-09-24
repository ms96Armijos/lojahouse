import { Contrato } from './../../../modelos/contrato.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContratoService } from './../../../services/contrato/contrato.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contratoarrendatario',
  templateUrl: './contratoarrendatario.component.html',
  styleUrls: ['./contratoarrendatario.component.css']
})
export class ContratoarrendatarioComponent implements OnInit {

  constructor(public _contratoService: ContratoService, public toastr: ToastrService, public router: Router) { }

  contratos: Contrato[] = [];
  desde = 0;

  ngOnInit(): void {
    this.cargarContratos();
  }

  cargarContratos() {
    this._contratoService.cargarContratosArrendatario(this.desde)
      .subscribe(contratos => { this.contratos = contratos });
  }


  buscarContratos(termino: string) {


    if (termino.length <= 0) {
      this.cargarContratos();
      return;
    }
    this._contratoService.buscarContratos(termino)
      .subscribe(contratos => this.contratos = contratos);

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

}
