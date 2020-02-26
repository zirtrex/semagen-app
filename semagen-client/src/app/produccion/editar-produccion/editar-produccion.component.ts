import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduccionService } from '../../services/produccion.service';
import { Produccion } from '../../models/produccion';

@Component({
  selector: 'app-editar-produccion',
  templateUrl: './editar-produccion.component.html',
  styles: []
})
export class EditarProduccionComponent implements OnInit {

  idProduccion: any;
  params: any;

  produccion = new Produccion();

  constructor(
    private produccionService:ProduccionService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.idProduccion = params['idProduccion']);
    this.produccionService.obtenerProduccion(this.idProduccion).subscribe(
      data => {
        console.log(data);
        this.produccion.idProduccion = data['idProduccion'];
        this.produccion.trabajador = data['trabajador'];
        this.produccion.cantidad = data['cantidad'];
        this.produccion.fechaProduccion = data['fechaProduccion'];
        this.produccion.observaciones = data['observaciones'];
        this.produccion.idProducto = data['idProducto'];
        this.produccion.producto = data['producto'];
      },
      error => console.log(<any> error)
    );
  }

  ngOnDestroy(){
    this.params.unsubscribe();
  }

  editarProduccion(produccion){
    this.produccionService.editarProduccion(produccion)
      .subscribe(
        response => {
            console.log(response);
            alert(response.message);
            if(!response.error){
              this.router.navigate(['/producciones']);
            }
        },
        error => console.log(<any> error)
      )
  }

}
