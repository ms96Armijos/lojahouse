import { Component, OnInit } from '@angular/core';

//LLAMAR UNA FUNCION DE JQUERY FUERA DE ANGULAR
declare function init_plugins();

@Component({
  selector: 'app-pagina404',
  templateUrl: './pagina404.component.html',
  styles: [
  ]
})
export class Pagina404Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
