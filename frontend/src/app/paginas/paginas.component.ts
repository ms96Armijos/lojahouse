import { Component, OnInit } from '@angular/core';

//LLAMAR UNA FUNCION DE JQUERY FUERA DE ANGULAR
declare function init_plugins();

@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.component.html',
  styles: [
  ]
})
export class PaginasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
