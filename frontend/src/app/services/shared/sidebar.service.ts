import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any = [
    {
      titulo: 'Arrendador',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: ' Dashboard', url: '/dashboard' },
        { titulo: ' Gestión de Inmuebles ', url: '/inmuebles' },
        { titulo: ' Gestión de visitas ', url: '/visitas' },
        { titulo: ' Gestión de Contratos de Alquiler ', url: '/vercontrato' },
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
