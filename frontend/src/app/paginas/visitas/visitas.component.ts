import { Visita } from './../../modelos/visita.model';
import { VisitasService } from './../../services/visitas/visitas.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styles: [
  ]
})
export class VisitasComponent implements OnInit {

  visitas: Visita[] = [];
  desde = 0;


  constructor( public _serviceVisita: VisitasService,
    public toastr: ToastrService, public router: Router ) { }

  ngOnInit(): void {
    this.cargarVisitas();
  }

  cargarVisitas(){
    this._serviceVisita.cargarVisitas(this.desde)
    .subscribe( visita => this.visitas = visita);
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

  buscarVisitas(termino: string){


    if ( termino.length <= 0 ){
      this.cargarVisitas();
      return;
    }
    this._serviceVisita.buscarVisitas( termino )
    .subscribe((visitas: Visita[]) => {
      console.log(termino);
      this.visitas = visitas;
    });

  }

}
