import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse   } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable()
export class VentaService {

  private REST_API_SERVER_DEV = "http://localhost/Rafael/Proyectos/Proyectos_Web/semagen-app/semagen-api/public/index.php/api/v1/ventas";
  private REST_API_SERVER_PROD = "http://zirtrex.net/semagen_api/public/index.php/api/v1/ventas";

  constructor(private http:HttpClient) { }

  getVentas(): Observable<Venta[]>{
    return this.http
              .get<Venta[]>(this.REST_API_SERVER_PROD)
              .pipe(catchError(this.handleError));
  }

  agregarVenta(venta: Venta): Observable<Venta[]>{
    return this.http
              .post<Venta[]>(this.REST_API_SERVER_PROD, venta)
              .pipe(catchError(this.handleError));
  }

  obtenerVenta(idVentas: String): Observable<Venta[]>{
    return this.http
              .get<Venta[]>(this.REST_API_SERVER_PROD + '/' + idVentas)
              .pipe(catchError(this.handleError));
  }

  editarVenta(venta: Venta): Observable<Venta[]>{
    const url = `${this.REST_API_SERVER_PROD}/${venta["idVentas"]}`; //console.log(venta);
    return this.http
              .put<Venta[]>(url, venta)
              .pipe(catchError(this.handleError));
  }

  eliminarVenta(idVentas: String){
    const url = `${this.REST_API_SERVER_PROD}/${idVentas}`;
    return this.http
              .delete(url)
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
