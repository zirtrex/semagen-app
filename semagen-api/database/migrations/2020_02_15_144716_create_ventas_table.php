<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVentasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invsem_ventas', function (Blueprint $table) {
          $table->increments('idVentas');
          $table->string('comprador', 500)->nullable();
          $table->integer('cantidad');
          $table->dateTime('fechaVenta');
          $table->string('tipoPago', 50);
          $table->decimal('precioUnitario', 10,2);
          $table->decimal('precioTotal', 10,2);
          $table->string('observaciones', 500);
          $table->integer('idProducto')->unsigned();
          $table->timestamps();
          $table->foreign('idProducto')->references('idProducto')->on('invsem_productos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invsem_ventas');
    }
}
