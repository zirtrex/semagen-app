<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Venta;
use App\Producto;
use Illuminate\Support\Facades\Response;
use Illuminate\Database\QueryException;

class VentasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      //$ventas = Venta::all();
      $ventas = Venta::with('producto')->get();
      $response = Response::json($ventas, 200);
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

      $venta = new Venta(array(
        'comprador' => trim($request->comprador),
        'cantidad' =>   $cantidad,
        'fechaVenta' => trim($request->fechaVenta),
        'tipoPago' => trim($request->tipoPago),
        'precioUnitario' => trim($request->precioUnitario),
        'precioTotal' => ($request->precioUnitario * $request->cantidad),
        'observaciones' => trim($request->observaciones),
        'idProducto' => $idProducto,
      ));

      try{
        $venta->saveOrFail();
        //$venta->save();

        $producto = Producto::find($idProducto);
        if($producto){
            $nuevoStock = $producto->stock - $cantidad;
            $producto->stock = $nuevoStock;
            $producto->save();
        }

        $response = Response::json([
          'message' => 'Venta creada con exito',
          'venta' => $venta
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
      $venta = Venta::with('producto')->get()->find($id);

      if(!$venta){
        $response = Response::json([
          'message' => "No se ha encontrado la venta"
        ], 404);
        return $response;
      }

      $response = Response::json($venta, 200);
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
      if( (!$request->idVentas) || (!$request->cantidad) ){
        $response = Response::json([
          'message' => 'Por favor escriba todos los campos requeridos'
        ], 422);
        return $response;
      }

      $venta = Venta::find($request->idVentas);

      if( !$venta ){
        $response = Response::json([
          'message' => 'No se ha encontrado el producto'
        ], 404);
        return $response;
      }

      $cantidadPrevia = trim($venta->cantidad); //10
      $cantidadNueva = trim($request->cantidad); // 20
      //Operacion:  10-20=-10
      $cantidadACambiar = $cantidadPrevia-$cantidadNueva;
      $idProducto = trim($request->idProducto);

      $venta->comprador = trim($request->comprador);
      $venta->cantidad =   $cantidadNueva;
      $venta->fechaVenta = trim($request->fechaVenta);
      $venta->tipoPago = trim($request->tipoPago);
      $venta->precioUnitario = trim($request->precioUnitario);
      $venta->precioTotal = ($request->precioUnitario * $request->cantidad);
      $venta->observaciones = trim($request->observaciones);
      $venta->idProducto = $idProducto;

      try{
        $venta->saveOrFail();
        //$venta->save();

        $producto = Producto::find($idProducto);
        if($producto){
            $nuevoStock = $producto->stock + ($cantidadACambiar);
            $producto->stock = $nuevoStock;
            $producto->save();
        }

        $response = Response::json([
          'message' => 'Venta editada con exito',
          'venta' => $venta
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
      $venta = Venta::find($id);

      if(!$venta){
        $response = Response::json([
          'message' => "No se ha encontrado la venta"
        ], 404);
        return $response;
      }

      try{
        $venta->delete();

        $producto = Producto::find($venta->idProducto);

        if($producto){
            $nuevoStock = $producto->stock + $venta->cantidad;
            $producto->stock = $nuevoStock;
            $producto->save();
        }

        $response = Response::json([
          'message' => 'Venta eliminada con exito',
          'venta' => $venta
        ], 200);
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
}
