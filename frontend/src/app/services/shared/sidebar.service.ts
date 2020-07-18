import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: ' Dashboard', url: '/dashboard' },
        { titulo: ' Gestión de Inmuebles ', url: '/progress' },
        { titulo: ' Gestión de visitas ', url: '/gestion-visitas' },
        { titulo: ' Gestión de Contratos de Alquiler ', url: '/gestion-contratos' },
        { titulo: ' Alquilar inmueble ', url: '/alquilar-inmueble' }
      ],
    },
    {
      titulo: 'Configuraciones',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: '/usuarios'},
        {titulo: 'Servicios', url: '/servicios'}
      ]
    }
  ];

  constructor() {}
}
