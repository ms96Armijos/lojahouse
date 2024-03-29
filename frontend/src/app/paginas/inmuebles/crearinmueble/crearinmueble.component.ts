import { Servicio } from './../../../modelos/servicio.model';
import { ServiciosbasicosService } from './../../../services/serviciosbasicos/serviciosbasicos.service';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Inmueble } from './../../../modelos/inmueble.model';
import { InmueblesService } from './../../../services/inmueble/inmuebles.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as swal from 'sweetalert';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crearinmueble',
  templateUrl: './crearinmueble.component.html',
  styles: [
  ]
})
export class CrearinmuebleComponent implements OnInit {


  inmuebles: Inmueble = new Inmueble('', '', '', '', '', null);

  desde = 0;
  servicios = [];

  servicioselegidos = [
  ];
  nuevservicios = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  constructor(public _inmuebleService: InmueblesService,
    public _usuarioService: UsuarioService,
    public _basicosService: ServiciosbasicosService,
    public router: Router,
    public toastr: ToastrService,
    public activatedRoute: ActivatedRoute) {


      activatedRoute.params.subscribe(parametros => {
        let id = parametros['id'];

        if(id !== 'nuevo'){
          this.obtenerInmueble(id);
        }
      });

  }



  ngOnInit(): void {

    this._basicosService.cargarServicios()
      .subscribe(servicios => {
        this.servicios = servicios;
      });





  }


  obtenerInmueble(id: string){
    this._inmuebleService.obtenerInmueble( id )
    .subscribe( inmueble => {
      this.inmuebles = inmueble;
      console.log(this.inmuebles);
    });

  }


  crearInmueble(forma: NgForm) {


    if (forma.invalid) {
      return;
    }

    let idArrendador = localStorage.getItem('id');

    for (let serv of this.servicioselegidos) {
      //console.log(serv.nombre); // 1, "string", false
      this.nuevservicios.push(serv.nombre);
    }
    this.inmuebles.nombre = forma.value.nombre;
    this.inmuebles.descripcion = forma.value.descripcion;
    this.inmuebles.direccion = forma.value.direccion;
    this.inmuebles.codigo = forma.value.codigo;
    this.inmuebles.tipo = forma.value.tipo;
    this.inmuebles.precioalquiler = forma.value.precioalquiler;
    this.inmuebles.garantia = forma.value.garantia;
    this.inmuebles.servicio = this.nuevservicios;
    this.inmuebles.estado = 'OCUPADO';
    this.inmuebles.publicado = 'PRIVADO';
    this.inmuebles.usuario = Object(idArrendador);
    //this.inmuebles.usuario._id = this._usuarioService.usuario._id;




    /*const inmueble = new Inmueble(forma.value.nombre, forma.value.descripcion,
      forma.value.direccion, forma.value.codigo, forma.value.tipo,
      forma.value.precioalquiler, forma.value.garantia, this.nuevservicios, null,
      'OCUPADO', this._usuarioService.usuario._id);*/

    this._inmuebleService.crearInmueble(this.inmuebles)
      .subscribe(resp => {
        this.router.navigate(['/inmuebles']);
      });
  }

  cambiarPaginacion(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this._basicosService.totalServicios) {
      this.toastr.error('Solo existen ' + this._basicosService.totalServicios + ' items', 'Ya no se puede avanzar más');
      return;
    }
    if (desde < 0) {
      this.toastr.error(this.desde + ' items para retroceder', 'Ya no se puede retroceder más');
      return;
    }
    this.desde += valor;
    this.cargarServicios();
  }

  cargarServicios() {



    this._basicosService.cargarServicios(this.desde)
      .subscribe(servicios => this.servicios = servicios);
  }
}


