<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
  protected $table = "invsem_productos";
  protected $primaryKey = 'idProducto';
  protected $fillable = ['codigoProducto', 'nombreProducto', 'stock'];

  public function venta(){
    return $this->hasMany('App\Venta', 'idProducto');
  }

}
