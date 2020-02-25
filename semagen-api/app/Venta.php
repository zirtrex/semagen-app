<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
  protected $table = "invsem_ventas";
  protected $primaryKey = 'idVentas';
  protected $guarded = ['idVentas'];

  public function producto(){
    return $this->belongsTo('App\Producto', 'idProducto');
  }
}
