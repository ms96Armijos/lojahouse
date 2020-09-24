import { ContratoService } from './../../../services/contrato/contrato.service';
import { Contrato } from 'src/app/modelos/contrato.model';
import { MILISEGUNDOS } from './../../../config/config';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { Usuario } from './../../../modelos/usuario.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InmueblesService } from './../../../services/inmueble/inmuebles.service';
import { Inmueble } from './../../../modelos/inmueble.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.component.html',
  styles: []
})
export class InmuebleComponent implements OnInit {

  @ViewChild('nombreArrendatario') nombreArrendatario: ElementRef;

  inmuebles: Inmueble = new Inmueble('', '', '', '', '', null);
  usuarioArrendatario: Usuario = new Usuario(null, null, null, null, null);


  constructor(public _inmuebleService: InmueblesService,
    public activatedRoute: ActivatedRoute,
    public _contratoService: ContratoService,
    public toastr: ToastrService,
    public _usuarioService: UsuarioService) {

    activatedRoute.params.subscribe(parametros => {
      let id = parametros['id'];
      if (id !== 'nuevo') {
        this.obtenerInmueble(id);

      }
    });


  }

  ngOnInit(): void {

  }

  obtenerInmueble(id: string) {
    this._inmuebleService.obtenerInmueble(id)
      .subscribe(inmueble => {
        this.inmuebles = inmueble;
        //console.log(this.inmuebles);

      });
  }

  registrarArrendatario(forma: NgForm) {
    const referencia = this.nombreArrendatario.nativeElement;

    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(forma.value.nombre,
      forma.value.apellido, forma.value.celular, forma.value.email, 'ARRENDATARIO',
      null, null, null, null, '1');

    this._usuarioService.crearUsuario(usuario)
      .subscribe();
    referencia.setAttribute('value', usuario.nombre+' '+usuario.apellido);
  }

  buscarArrendatario(correo: string) {

    const referencia = this.nombreArrendatario.nativeElement;


    if (correo.length <= 0) {
       referencia.setAttribute('value', '');
      return;
    }

    this._usuarioService.buscarArrendatario(correo)
      .subscribe(usuario => {
        this.usuarioArrendatario = usuario;
        referencia.setAttribute('value', usuario.nombre+' '+usuario.apellido);
      });
  }

  crearContrato(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    let nombrecontrato = this.usuarioArrendatario.apellido+'_'+this.inmuebles.tipo;
    let inmuebles_id = this.inmuebles._id;
    let arrendador_id = this.inmuebles.usuario._id;
    let arrendatarioid = this.usuarioArrendatario._id;

    var StartDate = new Date(forma.value.fechainicio);
    var EndDate = new Date(forma.value.fechafin);

    let tiempocontrato = Math.round((Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate()) -
    Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate())) / MILISEGUNDOS);

    if(tiempocontrato > 0){
      const contrato = new Contrato(nombrecontrato, forma.value.fechainicio,
        forma.value.fechafin, forma.value.monto, tiempocontrato, Object(inmuebles_id),
        Object(arrendador_id), Object(arrendatarioid));

      this._contratoService.crearContrato(contrato)
        .subscribe(/*resp => {
          this.router.navigate(['/plantillacontrato', contrato._id]);
        }*/);
    }else{
      this.toastr.error('No se puede establecer un tiempo menor a cero meses', 'Por favor elija una fecha correcta');
    }

  }


}
