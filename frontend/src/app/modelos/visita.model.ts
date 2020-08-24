export class Visita {

  constructor(
    public fecha: Date,
    public descripcion: string,
    public estado: string,
    public inmueble: string,
    public usuario: string,
    public _id?: string
  ) { }

}
