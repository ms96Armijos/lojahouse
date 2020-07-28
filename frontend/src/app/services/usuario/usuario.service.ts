import { SubirArchivoService } from './../subirArchivo/subir-archivo.service';
import { Usuario } from './../../modelos/usuario.model';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Usuario;
  token: string;



  constructor(public http: HttpClient, public router: Router, public servicioSubirArchivo: SubirArchivoService) {
    this.cargarStorage();
  }

  //VERIFICAR SI EL USAURIO SE HA LOGUEADO EVALUANDO QUE EL TOKEN EXISTA
  estaLogueado() {
    return (this.token.length > 0) ? true : false;
  }



  //INICIALIZANDO AL LOCALSTORAGE
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarDatosEnStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  eliminarStorage() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
  }

  //FUNCIONA PARA SALIR DE LA APLICACION
  logout() {

    swal({
      title: '¿Está seguro de salir de LojaHouse?',
      text: 'Esperamos que regreses pronto',
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Aceptar'
      ],
      dangerMode: true,
    }).then(borrar => {
      if (borrar) {
        this.eliminarStorage();
        swal('Hasta luego ', ' No olvides visitarnos de nuevo', 'success');
        this.router.navigate(['/login']);
      }
    });
  }

  //Tivi1996

  login(usuario: Usuario) {
    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {

        this.guardarDatosEnStorage(resp.id, resp.token, resp.usuario);

        const tipoUsuario = resp.usuario.rol;

        switch (tipoUsuario) {
          case 'ADMINISTRADOR':
            swal('Bienvenido ' + resp.usuario.nombre + ' ' + resp.usuario.apellido,
              'Eres el administrador de LojaHouse ', 'success');
            break;
          case 'ARRENDADOR':
            swal('Bienvenido ' + resp.usuario.nombre + ' ' + resp.usuario.apellido,
              'Puedes publicar tus bienes inmuebles en LojaHouse ', 'success');
            break;
          case 'ARRENDATARIO':
            swal('Bienvenido ' + resp.usuario.nombre + ' ' + resp.usuario.apellido,
              'Puedes empezar a buscar bienes inmuebles ', 'success');
            break;
        }
        return true;
      }),
      catchError((err) => {
        swal('Lo siento...', ' ' + err.error.mensaje, 'error');
        return throwError(err.error.mensaje);
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal(
          'Tu cuenta ha sido creada\n' + usuario.nombre,
          'Se ha enviado la contraseña a tu correo electrónico',
          'success'
        );
        return true;
      }),
      catchError((err) => {
        swal('Uppss...' + err.error.mensaje, ' Existen campos obligatorios vacíos', 'error');
        return throwError(err.error.mensaje);
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(map((resp: any) => {

      if (usuario._id === this.usuario._id) {
        const usuarioDB = resp.usuario;
        this.guardarDatosEnStorage(usuarioDB._id, this.token, usuarioDB);
      }

      return true;
    }),
      catchError((err) => {
        console.log(err.error.errors.message);

        /*if (err.error.errors.message === 'jwt expired') {
          this.eliminarStorage();
          this.router.navigate(['/login']);
        }*/

        swal('Uppss...', '' + err.error.mensaje, 'error');
        return throwError('Lo siento, ha ocurrido un error ' + err.error.errors.message);
      }));
  }

  actualizarImagen(archivo: File, id: string) {

    this.servicioSubirArchivo.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.imagen = resp.usuario.imagen;
        swal('Imagen actualizada', 'Se ha actualizado su foto de perfil', 'success');
        this.guardarDatosEnStorage(id, this.token, this.usuario);
      })
      .catch(resp => {
       console.log(resp);
      });

  }



  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.usuarios));
  }

  /*borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
      .pipe(
        map((resp: any) => {
          swal('Usuario borrado', 'El usuario ha sido eliminado ', 'success');
          return true;
        }),
        catchError((err) => {
          if (err.error.errors.message === 'jwt expired') {
            this.eliminarStorage();
            this.router.navigate(['/login']);
          }
          swal('Recuerda:\n la contraseña ' + err.error.mensaje, ' Error al actualizar contraseña', 'error');
          return throwError(err.error.mensaje);
        })
      );
  }*/

  cambiarPassword(usuario: Usuario) {
    let url = URL_SERVICIOS + '/password/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(map((resp: any) => {
      swal('Contraseña actualizada', 'Se ha actualizado su contraseña', 'success');
      const usuarioDB = resp.usuario;
      this.guardarDatosEnStorage(usuarioDB._id, this.token, usuarioDB);
      return true;
    }),
    catchError((err) => {
      swal('Uppss...' + err.error.mensaje, '', 'error');
      return throwError(err.error.mensaje);
    }));
  }

  reseteoDePassword(usuario: string) {
    const url = URL_SERVICIOS + '/resetpassword';

    return this.http.put(url, usuario).pipe(map((resp: any) => {
      swal('Contraseña reseteada', 'Se ha enviado la nueva contraseña al correo electrónico: ' + resp.usuario.correo, 'success');
      this.router.navigate(['/login']);
      return true;
    }),
      catchError((err) => {
        swal('Uppss...' + err.error.mensaje, '', 'error');
        return throwError(err.error.mensaje);
      })
    );
  }

}
