import { Usuario } from './../modelos/usuario.model';
import { UsuarioService } from './../services/service.index';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import * as swal from 'sweetalert';
import { from } from 'rxjs';
import { Router } from '@angular/router';

//LLAMAR UNA FUNCION DE JQUERY FUERA DE ANGULAR
declare function init_plugins();

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./login.component.css'],
})
export class RegistroComponent implements OnInit {


  constructor(
    public _usuarioService: UsuarioService,
    public router: Router) { }

  ngOnInit(): void {
    init_plugins();

  }

  registrarUsuario(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    if (forma.value.rol === "SELECCIONAR" || forma.value.rol === '') {
      swal.default('¡Importante!', 'Debe especificar quién eres', 'warning');
      return;
    }

    const usuario = new Usuario(forma.value.nombre,
      forma.value.apellido, forma.value.movil, forma.value.correo, forma.value.rol,
      null, null, null, null, '1');

    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp => {
        this.router.navigate(['/login']);
      });
  }
}
