import { Inmueble } from './inmueble.model';
import { Usuario } from './usuario.model';
export class Visita {

  constructor(
    public fecha: Date,
    public descripcion: string,
    public estado: string,
    public inmueble: Inmueble,
    public usuarioarrendatario: Usuario,
    public _id?: string
  ) { }

}
