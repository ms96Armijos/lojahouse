import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {

  menu: any[] = [];
  /*menu: any = [
    {
      titulo: 'Arrendador',
      icono: 'mdi mdi-account',
      submenu: [
        { titulo: ' Dashboard', url: '/dashboard' },
        { titulo: ' Gestión de Inmuebles ', url: '/inmuebles' },
        { titulo: ' Gestión de visitas ', url: '/visitas' },
        { titulo: ' Gestión de Contratos de Alquiler ', url: '/vercontrato' },
        { titulo: ' Alquilar inmueble ', url: '/publicados' }
      ],
    },

    {
      titulo: 'Arrendatario',
      icono: 'mdi mdi-account-outline',
      submenu: [
        { titulo: ' Gestión de visitas ', url: '/visitas-arrendatario' },
        { titulo: ' Gestión de Contratos de Alquiler ', url: '/contratoarrendatario' },
      ],
    },


    {
      titulo: 'Configuraciones',
      icono: 'mdi mdi-account-settings-variant',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Servicios', url: '/servicios' }
      ]
    }
  ];*/

  constructor(public _usuarioService: UsuarioService) {
  }

  cargarMenu(){
    this.menu = this._usuarioService.menu;
  }
}
