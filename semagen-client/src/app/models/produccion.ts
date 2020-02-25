import { Producto } from '../models/producto';

export class Produccion {
  public idProduccion:number;
  public trabajador:string;
  public cantidad:number;
  public fechaProduccion:Date;
  public observaciones:string;
  public idProducto:number;
  public producto: Producto;
}
