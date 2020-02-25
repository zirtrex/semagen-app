import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Produccion } from '../models/produccion';
import { ProduccionService } from '../services/produccion.service';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styles: []
})
export class ProduccionComponent implements OnInit {

  producciones: Observable<Produccion[]>;

  constructor(private produccionService:ProduccionService) { }

  ngOnInit() {
    this.producciones = this.produccionService.getProducciones();
  }

}
