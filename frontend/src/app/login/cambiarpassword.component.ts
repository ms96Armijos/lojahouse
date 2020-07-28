import { catchError } from 'rxjs/operators';
import { Usuario } from '../modelos/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-cambiarpassword',
  templateUrl: './cambiarpassword.component.html',
  styles: [
  ]
})
export class RecuperarpasswordComponent implements OnInit {

  usuario: Usuario;
  password: string;
  password2: string;


  constructor(public router: Router, public _usuarioService: UsuarioService, public toastr: ToastrService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {

  }

  actualizarPassword(usuario: Usuario) {

    if (this.password.length === 0) {
      this.toastr.warning('', 'contraseña es obligatoria');
      return;
    }

    if (this.password2.length === 0) {
      this.toastr.warning('', 'Debes confirmar tu contraseña ingresada');
      return;
    }

    if (this.password !== this.password2) {
      swal(
        'Oppss...',
        'Las contraseñas no coinciden',
        'error'
      );
      return;
    }

    if (this.password === this.password2 && this.password.length > 0 && this.password2.length > 0) {
      console.log(this.password);
      this.usuario.password = this.password;
      this._usuarioService.cambiarPassword(this.usuario).subscribe( resp => {

        if (resp) {
          swal(
            'Actualización exitosa',
            'Se ha actualizado su información correctamente',
            'success'
          );
          this.password = '';
          this.password2 = '';
        }
      });
    }
  }
}
