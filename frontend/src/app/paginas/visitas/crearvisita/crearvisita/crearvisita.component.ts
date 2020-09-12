import { VisitasService } from './../../../../services/visitas/visitas.service';
import { Usuario } from './../../../../modelos/usuario.model';
import { UsuarioService } from './../../../../services/usuario/usuario.service';
import { Visita } from './../../../../modelos/visita.model';
import { NgForm } from '@angular/forms';
import { Inmueble } from './../../../../modelos/inmueble.model';
import { InmueblesService } from './../../../../services/inmueble/inmuebles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crearvisita',
  templateUrl: './crearvisita.component.html',
  styles: []
})
export class CrearvisitaComponent implements OnInit {

  inmuebles: Inmueble = new Inmueble('', '', '', '', '', null);
  usuarios: Usuario = new Usuario(null, null, null, null, null);

  constructor(public _inmuebleService: InmueblesService,
    public _usuarioService: UsuarioService,
    public _visitaService: VisitasService,
    public router: Router, public activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe(parametros => {
        let id = parametros['id'];

          this.obtenerInmueble(id);

      });

    }

  ngOnInit(): void {
    this.obtenerArrendatario(localStorage.getItem('id'));
  }

  obtenerInmueble(id: string){
    this._inmuebleService.obtenerInmueble( id )
    .subscribe( inmueble => {


      this.inmuebles = inmueble;
      console.log(this.inmuebles);
    });
  }

  obtenerArrendatario(id: string){
    this._usuarioService.obtenerUsuario( id )
    .subscribe( usuarios => {
      this.usuarios = usuarios;
      console.log(this.usuarios);
    });
  }

  crearVisita(forma: NgForm) {

    let arrendatario_id = this.usuarios._id;
    let idinmueble = this.inmuebles._id;

    if (forma.invalid) {
      return;
    }

    //const fecha = new Date(forma.value.fecha);

    const visita = new Visita(forma.value.fecha, forma.value.descripcion, 'PENDIENTE', Object(idinmueble), Object(arrendatario_id));

    this._visitaService.crearVisita(visita)
      .subscribe(resp => {
        this.router.navigate(['/visitas']);
      });
  }

}
