import { Usuario } from './../modelos/usuario.model';
import { UsuarioService } from './../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

//LLAMAR UNA FUNCION DE JQUERY FUERA DE ANGULAR
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public router: Router, public _usuarioService: UsuarioService) {}

  ngOnInit(): void {
    init_plugins();
  }

  ingresar(forma: NgForm) {
    if(forma.invalid){
      return;
    }
    let usuario = new Usuario(null, null, null, forma.value.correo, null, forma.value.passord);
    this._usuarioService.login(usuario)
    .subscribe( resp => {
      this.router.navigate(['/dashboard']);
      console.log(resp);
    });
    //this.router.navigate(['/dashboard']);
  }
}
