<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Produccion;
use App\Producto;
use Illuminate\Support\Facades\Response;
use Illuminate\Database\QueryException;

class ProduccionesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $producciones = Produccion::with('producto')->get();
      $response = Response::json($producciones, 200);
      return $response;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      if( (!$request->cantidad) || (!$request->idProducto) ){
        $response = Response::json([
          'message' => 'Por favor escriba todos los campos requeridos'
        ], 422);
        return $response;
      }

      $cantidad = trim($request->cantidad);
      $idProducto = trim($request->idProducto);

      $produccion = new Produccion(array(
        'trabajador' => trim($request->trabajador),
        'cantidad' =>   $cantidad,
        'fechaProduccion' => trim($request->fechaProduccion),
        'observaciones' => trim($request->observaciones),
        'idProducto' => $idProducto,
      ));

      try{
        $produccion->saveOrFail();

        $producto = Producto::find($idProducto);
        if($producto){
            $nuevoStock = $producto->stock + $cantidad;
            $producto->stock = $nuevoStock;
            $producto->save();
        }

        $response = Response::json([
          'message' => 'Producción creada con éxito',
          'produccion' => $produccion
        ], 201);
        return $response;
      }
      catch (QueryException $e){
          $errorCode = $e->errorInfo[1];
          $errorMessage = $e->getMessage();
          $response = Response::json([
            'message' => 'Ha ocurrido un error: ' . $errorCode . '-' . $errorMessage
          ], 422);
          return $response;
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $produccion = Produccion::with('producto')->get()->find($id);

      if(!$produccion){
        $response = Response::json([
          'message' => "No se ha encontrado la produccion"
        ], 404);
        return $response;
      }

      $response = Response::json($produccion, 200);
      return $response;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      if( (!$request->idProduccion) || (!$request->cantidad) ){
        $response = Response::json([
          'message' => 'Por favor escriba todos los campos requeridos'
        ], 422);
        return $response;
      }

      $produccion = Produccion::find($request->idProduccion);

      if( !$produccion ){
        $response = Response::json([
          'message' => 'No se ha encontrado el producto'
        ], 404);
        return $response;
      }

      $cantidadPrevia = trim($produccion->cantidad); //10
      $cantidadNueva = trim($request->cantidad); // 20
      //Operacion:  10-20=-10
      $cantidadACambiar = $cantidadPrevia-$cantidadNueva;
      $idProducto = trim($request->idProducto);

      $produccion->trabajador = trim($request->trabajador);
      $produccion->cantidad =   $cantidadNueva;
      $produccion->fechaProduccion = trim($request->fechaProduccion);
      $produccion->observaciones = trim($request->observaciones);
      $produccion->idProducto = $idProducto;

      try{
        $produccion->saveOrFail();

        $producto = Producto::find($idProducto);

        if($producto){
            $nuevoStock = $producto->stock - ($cantidadACambiar);
            $producto->stock = $nuevoStock;
            $producto->save();
        }

        $response = Response::json([
          'message' => 'Produccion editada con exito',
          'produccion' => $produccion
        ], 201);
        return $response;
      }
      catch (QueryException $e){
          $errorCode = $e->errorInfo[1];
          $errorMessage = $e->getMessage();
          $response = Response::json([
            'message' => 'Ha ocurrido un error: ' . $errorCode . '-' . $errorMessage
          ], 422);
          return $response;
      }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
