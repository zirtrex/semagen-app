import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './eliminar-producto/eliminar-producto.component';
import { ExporterService } from '../services/exporter.service';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig,
  MatSnackBar
} from '@angular/material';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: []
})
export class ProductoComponent implements OnInit {

  //productos: Observable<Producto[]>;

  displayedColumns: string[] = ['idProducto', 'codigoProducto', 'nombreProducto', 'stock', 'acciones'];
  dataSource: MatTableDataSource<Producto>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  teclaPresionada: string;

  constructor(
    private productoService:ProductoService,
    public dialog:MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private exporter: ExporterService
  ) {}

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.productoService.getProductos().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.itemsPerPageLabel = 'Productos por página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.dataSource.paginator = this.paginator;
        this.changeDetectorRefs.detectChanges();
        //console.log(this.dataSource);
      }
    );
  }

  aplicarFiltro() {
    this.dataSource.filter = this.teclaPresionada.trim().toLowerCase();
  }

  limpiarBusqueda(){
    this.teclaPresionada = "";
    this.aplicarFiltro();
  }

  crearProducto(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    this.dialog.open(CrearProductoComponent, dialogConfig)
      .afterClosed().subscribe(result => this.obtenerDatos());
  }

  editarProducto(producto){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = producto;
    this.dialog.open(EditarProductoComponent, dialogConfig)
      .afterClosed().subscribe(result => this.obtenerDatos());
  }

  eliminarProducto(producto){
    /*if(confirm('¿Estás seguro que deseas eliminar el producto: ' + producto.nombreProducto)){
      this.productoService.eliminarProducto(producto.idProducto)
        .subscribe(
          response => {
              console.log(response);
              this.snackBar.open(response.message, null, {
                duration: 10000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['text-warning']
              });
              this.obtenerDatos();
          },
          error => console.log(<any> error)
        )
    }*/
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = producto;
    this.dialog.open(EliminarProductoComponent, dialogConfig)
      .afterClosed().subscribe(result => this.obtenerDatos());
  }

  exportarAExcel(){
    this.exporter.exportToExcel(this.dataSource.filteredData, 'productos')
  }

}
