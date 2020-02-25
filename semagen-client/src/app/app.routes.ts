import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const appRoutes: Routes = [
  /*{path: '', redirectTo: '/productos', pathMatch: 'full'},*/
  {path: '', component: InicioComponent},
  {path: 'productos', component: ProductoComponent},
  {path: 'productos/create', component: CrearProductoComponent},
  {path: 'productos/edit/:idProducto', component: EditarProductoComponent},
  {path: 'productos/delete/:idProducto', component: EliminarProductoComponent},
  {path: 'ventas', component: VentaComponent},
  {path: 'ventas/create/:idProducto', component: CrearVentaComponent},
  {path: 'ventas/edit/:idVentas', component: EditarVentaComponent},
  {path: 'ventas/delete/:idVentas', component: EliminarVentaComponent},
  {path: 'producciones', component: ProduccionComponent},
  {path: 'producciones/create/:idProducto', component: CrearProduccionComponent},
  {path: 'producciones/edit/:idProduccion', component: EditarProduccionComponent},
];

export const routes:ModuleWithProviders = RouterModule.forRoot(appRoutes);
