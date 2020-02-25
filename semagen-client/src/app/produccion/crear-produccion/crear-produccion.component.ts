import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { ProduccionService } from '../../services/produccion.service';
import { Producto } from '../../models/producto';
import { Produccion } from '../../models/produccion';

@Component({
  selector: 'app-crear-produccion',
  templateUrl: './crear-produccion.component.html',
  styles: []
})
export class CrearProduccionComponent implements OnInit {

  idProducto: any;
  params: any;

  produccion = new Produccion();

  constructor(private activatedRoute: ActivatedRoute, private router:Router, private produccionService:ProduccionService) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.idProducto = params['idProducto']);
    this.produccion.idProducto = this.idProducto;
  }

  ngOnDestroy(){
    this.params.unsubscribe();
  }

  crearProduccion(produccion){
    this.produccionService.agregarProduccion(produccion)
      .subscribe(
        response => {
            console.log(response);
            //alert(response.message);
            this.router.navigate(['/producciones']);
        },
        error => console.log(<any> error)
      )
  }

}
