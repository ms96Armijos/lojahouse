import { Usuario } from './../../modelos/usuario.model';
import { SidebarService, UsuarioService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;

  constructor( public _sidebar: SidebarService, public _usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);

    this.usuario = tokenPayload.usuario;

    this._sidebar.cargarMenu();
  }

}
