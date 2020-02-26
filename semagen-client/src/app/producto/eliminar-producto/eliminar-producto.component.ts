import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: []
})
export class EliminarProductoComponent implements OnInit, OnDestroy {

  idProducto: any;
  params: any;

  producto = new Producto(0, 0, '', 0);

  constructor(private productoService:ProductoService, private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.idProducto = params['idProducto']);
    this.productoService.obtenerProducto(this.idProducto).subscribe(
      data => {
        console.log(data);
        this.producto.idProducto = data['idProducto'];
        this.producto.codigoProducto = data['codigoProducto'];
        this.producto.nombreProducto = data['nombreProducto'];
        this.producto.stock = data['stock'];
      },
      error => {
        console.log(<any> error);
        this.router.navigate(['/productos']);
      }
    );
  }

  ngOnDestroy(){
    this.params.unsubscribe();
  }

  eliminarProducto(producto){
    this.productoService.eliminarProducto(producto)
      .subscribe(
        response => {
            console.log(response);
            alert(response.message);
            if(!response.error){
              this.router.navigate(['/productos']);
            }
        },
        error => console.log(<any> error)
      )
  }
}
