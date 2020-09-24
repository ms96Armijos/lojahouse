import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VisitasService } from '../../../services/visitas/visitas.service';
import { Visita } from "../../../modelos/visita.model";
import { Component, OnInit } from "@angular/core";

//LLAMAR UNA FUNCION DE JQUERY FUERA DE ANGULAR
declare function init_plugins();

@Component({
  selector: "app-vervisitas",
  templateUrl: "./vervisitasarrendatario.component.html",
  styles: [],
})
export class VervisitasarrendatarioComponent implements OnInit {
  visitas: Visita = new Visita(null, null, null, null, null);

  constructor(public _visitaService: VisitasService,
    public router: Router, public activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe(parametros => {
        let id = parametros['id'];

        if(id !== 'nuevo'){
          this.obtenerVisitaArrendatario(id);
        }
      });
    }

    ngOnInit(): void {
      init_plugins();
    }

    obtenerVisitaArrendatario(id: string){
      this._visitaService.obtenerVisitaArrendatario( id )
      .subscribe( visita => {

        this.visitas = visita;
       //console.log('visita: '+this.visitas.inmueble.nombre );
      });
    }

    modificarVisita(forma: NgForm){
      if (forma.invalid) {
        return;
      }

      this.visitas.descripcion = forma.value.descripcion;
    }
    /*crearServicio(forma: NgForm){

      if (forma.invalid) {
        return;
      }

      this.servicios.nombre = forma.value.nombre;

      const servicio = new Servicio(forma.value.nombre);

      this._basicosService.crearServicio(this.servicios)
        .subscribe(resp => {
          this.router.navigate(['/servicios']);
        });

  }*/



}
