import { Usuario } from './../../modelos/usuario.model';
import { UsuarioService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
  }

}
