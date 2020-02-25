import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';
import { VentaService } from '../services/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: []
})
export class VentaComponent implements OnInit {

  ventas: Observable<Venta[]>;

  constructor(private ventaService:VentaService) { }

  ngOnInit() {
    this.ventas = this.ventaService.getVentas();
  }

}
