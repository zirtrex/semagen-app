import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: []
})
export class ProductoComponent implements OnInit {

  productos: Observable<Producto[]>;

  constructor(private productoService:ProductoService) { }

  ngOnInit() {
    this.productos = this.productoService.getProductos();
  }
  
}
