import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: []
})
export class CrearProductoComponent implements OnInit {

  constructor(private productoService:ProductoService, private router:Router) { }

  ngOnInit() {
  }

  crearProducto(producto){
    this.productoService.agregarProducto(producto)
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
