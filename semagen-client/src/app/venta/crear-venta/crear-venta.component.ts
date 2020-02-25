import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { VentaService } from '../../services/venta.service';
import { Producto } from '../../models/producto';
import { Venta } from '../../models/venta';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: []
})
export class CrearVentaComponent implements OnInit, OnDestroy {

  idProducto: any;
  params: any;

  venta = new Venta();

  constructor(private activatedRoute: ActivatedRoute, private router:Router, private ventaService:VentaService) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.idProducto = params['idProducto']);
    this.venta.idProducto = this.idProducto;
  }

  ngOnDestroy(){
    this.params.unsubscribe();
  }

  crearVenta(venta){
    console.log(venta);
    this.ventaService.agregarVenta(venta)
      .subscribe(
        response => {
            console.log(response);
            this.router.navigate(['/ventas']);            
        },
        error => console.log(<any> error)
      )
  }

}
