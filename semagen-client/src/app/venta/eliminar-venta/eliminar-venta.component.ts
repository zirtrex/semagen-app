import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VentaService } from '../../services/venta.service';
import { Venta } from '../../models/venta';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-eliminar-venta',
  templateUrl: './eliminar-venta.component.html',
  styles: []
})
export class EliminarVentaComponent implements OnInit, OnDestroy {

  idVentas: any;
  params: any;
  venta = new Venta();
  producto: Producto;

  constructor(private ventaService:VentaService, private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.idVentas = params['idVentas']);
    this.ventaService.obtenerVenta(this.idVentas).subscribe(
      data => {
        console.log(data);
        this.venta.idVentas = data['idVentas'];
        this.venta.cantidad = data['cantidad'];
        this.producto = data['producto'];
      },
      error => {
        console.log(<any> error);
        this.router.navigate(['/ventas']);
      }
    );
  }

  ngOnDestroy(){
    this.params.unsubscribe();
  }

  eliminarVenta(venta){
    this.ventaService
      .eliminarVenta(venta)
      .subscribe(
        response => {
            console.log(response);
            //alert(response.message);
            this.router.navigate(['/ventas']);
        },
        error => console.log(<any> error)
      )
  }

}
