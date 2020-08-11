import { UsuarioService } from '../../services/service.index';
import { Usuario } from './../../modelos/usuario.model';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalDeRegistros = 0;
  cargando = true;


  constructor(public _usuarioService: UsuarioService, public toastr: ToastrService) { }

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
      this.toastr.error('Solo existen ' + this.totalDeRegistros + ' items', 'Ya no se puede avanzar más');
      return;
    }
    if (desde < 0) {
      this.toastr.error(this.desde + ' items para retroceder', 'Ya no se puede retroceder más');
      return;
    }


    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        console.log(termino);
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  /*borrarUsuario(usuario: Usuario) {

    if (usuario._id === this._usuarioService.usuario._id) {
      swal('Error al borrar el usuario', 'No se puede borrar el usuario: ' + usuario.nombre, 'error');
      return;
    }

    swal({
      title: '¿Está seguro de borrar el usuario?',
      text: 'Está a punto de borrar a: ' + usuario.nombre,
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Eliminar'
      ],
      dangerMode: true,
    })
      .then(borrar => {
        if (borrar) {
          this._usuarioService.borrarUsuario(usuario._id)
            .subscribe(borrado => {
              this.cargarUsuarios();
            });
        }
      });

  }*/

  guardarUsuario(usuario: Usuario) {

    let estadoObtenido: string ;

    if (usuario.estado === '1') {
      estadoObtenido = 'DESACTIVADO';
    }else{
      estadoObtenido = 'ACTIVADO';
    }

    swal({
      title: '¿Está seguro de realizar la siguiente acción?',
      text: 'El usuario será: ' + estadoObtenido,
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Aceptar'
      ],
      dangerMode: true,
    }).then(borrar => {
      if (borrar) {
        if (usuario.estado === '1') {
          usuario.estado = '0';
        } else {
          usuario.estado = '1';
        }

        this._usuarioService.actualizarUsuario(usuario)
          .subscribe();
        this.toastr.success('Usuario ' + estadoObtenido);
      }
    });
  }

}
