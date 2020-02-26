<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Producto;
use Illuminate\Support\Facades\Response;

class ProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $productos = Producto::all();
      $response = Response::json($productos, 200);
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
      if( !$request->nombreProducto ){
        $response = Response::json([
          'error' => true,
          'message' => 'Por favor escriba todos los campos requeridos'
        ], 422);
        return $response;
      }

      $producto = new Producto(array(
        'codigoProducto' => trim($request->codigoProducto),
        'nombreProducto' => trim($request->nombreProducto),
        'stock' => trim($request->stock)
      ));

      $producto->save();
      $response = Response::json([
        'error' => false,
        'message' => 'Producto creado con exito',
        'producto' => $producto
      ], 201);
      return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $producto = Producto::find($id);

      if(!$producto){
        $response = Response::json([
          'error' => true,
          'message' => "No se ha encontrado el producto"
        ], 404);
        return $response;
      }

      $response = Response::json($producto, 200);
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
      if( !$request->idProducto ){
        $response = Response::json([
          'error' => true,
          'message' => 'Por favor escriba todos los campos requeridos'
        ], 422);
        return $response;
      }

      $producto = Producto::find($request->idProducto);

      if( !$producto ){
        $response = Response::json([
          'error' => true,
          'message' => 'No se ha encontrado el producto'
        ], 404);
        return $response;
      }

      $producto->codigoProducto = trim($request->codigoProducto);
      $producto->nombreProducto = trim($request->nombreProducto);
      $producto->stock = trim($request->stock);

      $producto->save();

      $response = Response::json([
        'error' => false,
        'message' => 'Producto actualizado con exito',
        'producto' => $producto
      ], 201);
      return $response;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $producto = Producto::find($id);

      if(!$producto){
        $response = Response::json([
          'error' => true,
          'message' => "No se ha encontrado el producto"
        ], 404);
        return $response;
      }
      $producto->delete();
      $response = Response::json([
        'error' => false,
        'message' => 'Producto eliminado con exito',
        'producto' => $producto
      ], 200);
      return $response;
    }
}
