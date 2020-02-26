import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from '../../services/venta.service';
import { Venta } from '../../models/venta';

@Component({
  selector: 'app-editar-venta',
  templateUrl: './editar-venta.component.html',
  styleUrls: []
})
export class EditarVentaComponent implements OnInit {

  idVentas: any;
  params: any;

  venta = new Venta();

  constructor(private ventaService:VentaService, private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.idVentas = params['idVentas']);
    this.ventaService.obtenerVenta(this.idVentas).subscribe(
      data => {
        console.log(data);
        //this.venta = data;
        this.venta.idVentas = data['idVentas'];
        this.venta.comprador = data['comprador'];
        this.venta.cantidad = data['cantidad'];
        this.venta.fechaVenta = data['fechaVenta'];
        this.venta.tipoPago = data['tipoPago'];
        this.venta.precioUnitario = data['precioUnitario'];
        this.venta.precioTotal = data['precioTotal'];
        this.venta.observaciones = data['observaciones'];
        this.venta.idProducto = data['idProducto'];
        this.venta.producto = data['producto'];
      },
      error => console.log(<any> error)
    );
  }

  ngOnDestroy(){
    this.params.unsubscribe();
  }

  editarVenta(venta){ console.log(venta);
    this.ventaService.editarVenta(venta)
      .subscribe(
        response => {
          console.log(response);
          alert(response.message);
          if(!response.error){
            this.router.navigate(['/ventas']);
          }
        },
        error => console.log(<any> error)
      )
  }

}
