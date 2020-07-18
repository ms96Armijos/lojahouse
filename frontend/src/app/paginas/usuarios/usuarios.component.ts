import { UsuarioService } from '../../services/service.index';
import { Usuario } from './../../modelos/usuario.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 15;
  totalDeRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }


  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.totalDeRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });
  }

  cambiarPaginacion(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalDeRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    console.log(termino);
    this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        console.log(usuarios);
      });
  }

}
