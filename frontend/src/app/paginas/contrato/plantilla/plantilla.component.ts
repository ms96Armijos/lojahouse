import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratoService } from './../../../services/contrato/contrato.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Contrato } from 'src/app/modelos/contrato.model';
import * as jsPDF from 'jspdf';




@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styles: []
})
export class PlantillaComponent implements OnInit {

  @ViewChild('contratolojahouse') htmlData: ElementRef;



  contratos: Contrato = new Contrato(null, null, null, null, null);


  constructor(public _contratoService: ContratoService,
    public router: Router, public activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(parametros => {
      let id = parametros['id'];

      this.obtenerContrato(id);

    });
  }

  ngOnInit(): void {
  }

  obtenerContrato(id: string) {
    this._contratoService.obtenerContrato(id)
      .subscribe(contrato => {

        //console.log(contrato);
        this.contratos = contrato;
      });
  }

  public openPDF() {
    const informacion = this.htmlData.nativeElement;
    const pdf = new jsPDF('p', 'pt', [630, 900]);

    pdf.fromHTML(informacion, 20, 10, { maxWidth: 150, align: 'justify' });
    pdf.output('dataurlnewwindow');
  }


  exportarPDF() {
    const referencia = this.htmlData.nativeElement;

    const pdf = new jsPDF('p', 'pt', [630, 900]);
    pdf.fromHTML(referencia, 20, 10, { maxWidth: 150, align: 'justify' });
    pdf.save("ContratoLojaHouse.pdf");
  }

  /*var nDays = (    Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate()) -
                 Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate())) / 86400000;*/


}
