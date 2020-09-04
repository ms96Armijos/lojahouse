import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VisitasService } from './../../../services/visitas/visitas.service';
import { Visita } from "./../../../modelos/visita.model";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-vervisitas",
  templateUrl: "./vervisitas.component.html",
  styles: [],
})
export class VervisitasComponent implements OnInit {
  visitas: Visita = new Visita(null, null, null, null, null);

  constructor(public _visitaService: VisitasService,
    public router: Router, public activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe(parametros => {
        let id = parametros['id'];

        if(id !== 'nuevo'){
          this.obtenerVisita(id);
        }
      });
    }

    ngOnInit(): void { }

    obtenerVisita(id: string){
      this._visitaService.obtenerVisita( id )
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
