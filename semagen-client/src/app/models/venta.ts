import { Producto } from '../models/producto';

export class Venta {

  public idVentas:number;
  public comprador:string;
  public cantidad:number;
  public fechaVenta:Date;
  public tipoPago:string;
  public precioUnitario:number;
  public precioTotal:number;
  public observaciones:string;
  public idProducto:number;
  public producto: Producto;

  constructor(){}
}
