import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from './../../modelos/usuario.model';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

//LLAMAR UNA FUNCION DE JQUERY FUERA DE ANGULAR
declare function init_plugins();

@Component({
  selector: 'app-reseteopassword',
  templateUrl: './reseteopassword.component.html',
  styles: [
  ]
})
export class ReseteopasswordComponent implements OnInit {

  usuario: Usuario;
  correo: string;

  constructor(public router: Router, public _usuarioService: UsuarioService, public toastr: ToastrService) {
    this.usuario = this._usuarioService.usuario;

  }

  ngOnInit(): void {
    init_plugins();
  }

  resetearPassword(usuario: string) {

    if (this.correo.length === 0) {
      this.toastr.warning('', 'El usuario (Correo electrónico) es obligatorio');
      return;
    }

    swal({
      title: 'Se reseteará la contraseña del usuario: ' + this.correo,
      text: '¿Está seguro que ingresó bien su nombre de usuario?',
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Aceptar'
      ],
      dangerMode: true,
    }).then(reseteoPassord => {
      if (reseteoPassord) {
        this._usuarioService.reseteoDePassword(usuario).subscribe();
      }
    });


  }

}
