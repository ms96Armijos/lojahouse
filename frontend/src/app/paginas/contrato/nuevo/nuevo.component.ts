import { MILISEGUNDOS } from './../../../config/config';
import { Usuario } from './../../../modelos/usuario.model';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ContratoService } from './../../../services/contrato/contrato.service';
import { Contrato } from './../../../modelos/contrato.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitasService } from './../../../services/visitas/visitas.service';
import { Component, OnInit } from '@angular/core';
import { Visita } from "./../../../modelos/visita.model";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styles: []
})
export class NuevoComponent implements OnInit {


  visitas: Visita = new Visita(null, null, null, null, null);
  usuarioarrendador: Usuario = new Usuario(null, null, null, null, null);


  constructor(public _usuarioService: UsuarioService,
    public toastr: ToastrService, public _contratoService: ContratoService,
    public _visitaService: VisitasService, public activatedRoute: ActivatedRoute) {

      activatedRoute.params.subscribe(parametros => {
        let id = parametros['id'];
        this.obtenerVisita(id);
        //console.log(iduser);
        this.obtenerUsuarioArrendor(localStorage.getItem('id'));
      });

    }
  ngOnInit(): void {

  }

  obtenerVisita(id: string){
    this._visitaService.obtenerVisita( id )
    .subscribe( visita => {

      this.visitas = visita;
    });
  }

  obtenerUsuarioArrendor(id: string){
    this._usuarioService.obtenerUsuario( id )
    .subscribe( usuario => {

      this.usuarioarrendador = usuario;
     //console.log('user: '+usuario.nombre );
    });
  }


  crearContrato(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    let nombrecontrato = this.visitas.usuarioarrendatario.apellido+'_'+forma.value.tipo;

    let inmuebles_id = this.visitas.inmueble._id;
    let arrendador_id = this.usuarioarrendador._id;
    let arrendatarioid = this.visitas.usuarioarrendatario._id;


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
