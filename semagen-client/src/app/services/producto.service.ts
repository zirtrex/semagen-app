import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable()
export class ProductoService {

    private REST_API_SERVER_DEV = "http://localhost/Rafael/Proyectos/Proyectos_Web/semagen-app/semagen-api/public/index.php/api/v1/productos";
    private REST_API_SERVER_PROD = "http://zirtrex.net/semagen_api/public/index.php/api/v1/productos";

    constructor(private http:HttpClient) { }

    getProductos(): Observable<Producto[]>{
      return this.http
                .get<Producto[]>(this.REST_API_SERVER_PROD)
                .pipe(catchError(this.handleError));
    }

    //Se cambio Producto[] por any porque aquí no siempre devuelve un producto
    agregarProducto(producto: Producto): Observable<any>{
      return this.http
                .post<any>(this.REST_API_SERVER_PROD, producto)
                .pipe(catchError(this.handleError));
    }

    obtenerProducto(idProducto: String): Observable<any>{
      return this.http
                .get<any>(this.REST_API_SERVER_PROD + '/' + idProducto);
    }

    editarProducto(producto: Producto): Observable<any>{
      const url = `${this.REST_API_SERVER_PROD}/${producto["idProducto"]}`;
      return this.http
                .put<any>(url, producto)
                .pipe(catchError(this.handleError));
    }

    eliminarProducto(idProducto: string): Observable<any>{
      const url = `${this.REST_API_SERVER_PROD}/${idProducto}`;
      return this.http
                .delete<any>(url)
                .pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        // Client-side errors
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side errors
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
    }
}
