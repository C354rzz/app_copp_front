import { Movimientos } from '@/Models/movimientos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  listmov!: Movimientos[];

  constructor(private http: HttpClient) { }

  listMovimientos(){
    this.http.get(`${environment.API_URL}${environment.API_MOV}`).toPromise()
    .then(data => {
      this.listmov = data as Movimientos[];
    })
  }

  getAllMov(): Observable<Movimientos[]>{
    return this.http
      .get<Movimientos[]>(`${environment.API_URL}${environment.API_MOV}`)
      .pipe(catchError(this.handlerError));
      debugger;
  }

  getMovById(idMovimientos: number): Observable<Movimientos>{
    return this.http
      .get<Movimientos>(`${environment.API_URL}${environment.API_MOV}${idMovimientos}`)
      .pipe(catchError(this.handlerError));
  }
  newMov(mov: Movimientos): Observable<Movimientos>{
    return this.http
      .post<Movimientos>(`${environment.API_URL}${environment.API_MOV}`, mov)
      .pipe(catchError(this.handlerError));
  }
  updMov(idMovimientos: number, mov: Movimientos): Observable<Movimientos>{
    return this.http
      .put<Movimientos>(`${environment.API_URL}${environment.API_MOV}${idMovimientos}`, mov)
      .pipe(catchError(this.handlerError));
  }
  delMov(idMovimientos: number): Observable<{}>{
    return this.http
      .delete<Movimientos>(`${environment.API_URL}${environment.API_MOV}${idMovimientos}`)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error: { message: any; }): Observable<never>{
    let errorMessage = 'Error desconocido';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
