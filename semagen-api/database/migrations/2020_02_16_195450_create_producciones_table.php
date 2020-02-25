<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProduccionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invsem_producciones', function (Blueprint $table) {
          $table->increments('idProduccion');
          $table->string('trabajador', 500)->nullable();
          $table->integer('cantidad');
          $table->dateTime('fechaProduccion');
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
        Schema::dropIfExists('invsem_producciones');
    }
}
