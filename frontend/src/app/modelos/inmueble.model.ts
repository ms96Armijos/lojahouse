export class Inmueble {

  constructor(
    public nombre: string,
    public descripcion: string,
    public direccion: string,
    public codigo: string,
    public tipo: string,
    public precioalquiler: number,
    public garantia?: number,
    public servicio?: Array<string>,
    public imagen?: Array<string>,
    public precionormal?: number,
    public preciooferta?: number,
    public estado?: string,
    public usuario?: string,
    public _id?: string
  ) { }

}
