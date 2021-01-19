import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: []
})
export class CrearProductoComponent implements OnInit {

  constructor(
    private productoService:ProductoService,
    private router:Router,
    public dialogRef: MatDialogRef<CrearProductoComponent>,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  crearProducto(producto){
    this.productoService.agregarProducto(producto)
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
    this.dialogRef.close();
  }

}
