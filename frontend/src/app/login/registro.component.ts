import { Usuario } from './../modelos/usuario.model';
import { UsuarioService } from './../services/service.index';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router)
    {}

  ngOnInit(): void {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      movil: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      rol: new FormControl(null, Validators.required),
    });

    this.forma.setValue({
      nombre: 'Steeven',
      apellido: 'Armijos',
      movil: '453453453',
      correo: 'tiviarmijos@gmail.com',
      rol: 'Seleccionar',
    });
  }

  registrarUsuario() {
    if (this.forma.value.rol === 'Seleccionar') {
      swal.default('¡Importante!', 'Debe especificar quién eres', 'warning');
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.apellido,
      this.forma.value.movil,
      this.forma.value.correo,
      this.forma.value.rol
    );

    /*if (usuario.correo === this.forma.value.correo){
      swal.default('Lo sentimos...', 'El correo que intentas registrar ya existe');
      return;
    }*/

    this._usuarioService.crearUsuario(usuario)
    .subscribe(resp => {
      this.router.navigate(['/login']);
    });
  }
}
