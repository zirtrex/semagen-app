import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';

import { ProductoService } from './services/producto.service';
import { VentaService } from './services/venta.service';
import { ProduccionService } from './services/produccion.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductoComponent } from './producto/producto.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './producto/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './producto/eliminar-producto/eliminar-producto.component';
import { VentaComponent } from './venta/venta.component';
import { CrearVentaComponent } from './venta/crear-venta/crear-venta.component';
import { EditarVentaComponent } from './venta/editar-venta/editar-venta.component';
import { EliminarVentaComponent } from './venta/eliminar-venta/eliminar-venta.component';
import { ProduccionComponent } from './produccion/produccion.component';
import { CrearProduccionComponent } from './produccion/crear-produccion/crear-produccion.component';
import { EditarProduccionComponent } from './produccion/editar-produccion/editar-produccion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    ProductoComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    EliminarProductoComponent,
    VentaComponent,
    CrearVentaComponent,
    EditarVentaComponent,
    EliminarVentaComponent,
    ProduccionComponent,
    CrearProduccionComponent,
    EditarProduccionComponent
  ],
  imports: [
    BrowserModule,
    routes,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductoService, VentaService, ProduccionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
