import { UsuarioService } from '../../services/service.index';
import { Usuario } from './../../modelos/usuario.model';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {


  usuario: Usuario;
  subirImagen: File;
  imagenTemporal: string;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  ActualizarInformacionPerfil(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.apellido = usuario.apellido;
    this.usuario.movil = usuario.movil;
    this.usuario.convencional = usuario.convencional;
    this.usuario.cedula = usuario.cedula;


    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
    swal(
      'Actualización exitosa',
      'Se ha actualizado su información correctamente',
      'success'
    );
  }

  seleccionarImagen(archivo: File) {
    if (!archivo) {
      this.subirImagen = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imágen', 'error');
      this.subirImagen = null;
      return;
    }
    this.subirImagen = archivo;

    let reader = new FileReader();
    let urlImagenTemporal = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemporal = reader.result as string;
  }

  cambiarImagen() {
    this._usuarioService.actualizarImagen(this.subirImagen, this.usuario._id);
  }
}
