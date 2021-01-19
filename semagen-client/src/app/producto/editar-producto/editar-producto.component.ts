import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatSnackBar
} from "@angular/material";

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: []
})
export class EditarProductoComponent implements OnInit, OnDestroy {

  idProducto: any;
  params: any;

  producto = new Producto(0, 0, '', 0);

  constructor(
    private productoService:ProductoService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private dialogRef: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar,
  ) {
    this.producto = data;
  }

  ngOnInit() {
    //this.params = this.activatedRoute.params.subscribe(params => this.idProducto = params['idProducto']);
    this.productoService.obtenerProducto(this.idProducto.toString()).subscribe(
      data => {
        console.log(data);
        this.producto.idProducto = data['idProducto'];
        this.producto.codigoProducto = data['codigoProducto'];
        this.producto.nombreProducto = data['nombreProducto'];
        this.producto.stock = data['stock'];
      },
      error => console.log(<any> error)
    );
  }

  ngOnDestroy(){
    //this.params.unsubscribe();
  }

  editarProducto(producto){
    this.productoService.editarProducto(producto)
      .subscribe(
        response => {
          console.log(response);
          this.snackBar.open(response.message, null, {
            duration: 10000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['text-warning']
          });
          if(!response.error){
              //this.router.navigate(['/productos']);
              this.cerrarDialog();
          }
        },
        error => console.log(<any> error)
      )
  }

  cerrarDialog(){
    this.dialogRef.close(this.producto);
  }
}
