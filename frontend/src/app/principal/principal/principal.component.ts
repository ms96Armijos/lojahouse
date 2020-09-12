import { Inmueble } from './../../modelos/inmueble.model';
import { InmueblesService } from './../../services/inmueble/inmuebles.service';
import { Component, OnInit } from '@angular/core';

//LLAMAR UNA FUNCION DE JQUERY FUERA DE ANGULAR
declare function init_plugins();

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  inmuebles: Inmueble[] = [];
  desde: number = 0;

  constructor(public _inmuebleService: InmueblesService) { }

  ngOnInit(): void {
    init_plugins();
    this.cargarInmuebles();
  }

  cargarInmuebles() {
    this._inmuebleService.cargarInmueblesPulicos(this.desde)
      .subscribe(inmuebles => this.inmuebles = inmuebles);
  }

}
