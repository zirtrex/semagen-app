<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Produccion extends Model
{
  protected $table = "invsem_producciones";
  protected $primaryKey = 'idProduccion';
  protected $guarded = ['idProduccion'];

  public function producto(){
    return $this->belongsTo('App\Producto', 'idProducto');
  }
}
