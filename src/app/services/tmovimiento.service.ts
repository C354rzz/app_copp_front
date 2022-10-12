import { TipoMovimientos } from '@/Models/tipo-movimientos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TMovimientoService {

  listmov!: TipoMovimientos[];

  constructor(private http: HttpClient) { }

  listTMovimientos(){
    this.http.get(`${environment.API_URL}${environment.API_TMOV}`).toPromise()
    .then(data => {
      this.listmov = data as TipoMovimientos[];
    })
  }

  getAllTMov(): Observable<TipoMovimientos[]>{
    return this.http
      .get<TipoMovimientos[]>(`${environment.API_URL}${environment.API_TMOV}`)
      .pipe(catchError(this.handlerError));
      debugger;
  }

  getTMovById(idTMovimientos: number): Observable<TipoMovimientos>{
    return this.http
      .get<TipoMovimientos>(`${environment.API_URL}${environment.API_TMOV}${idTMovimientos}`)
      .pipe(catchError(this.handlerError));
  }
  newTMov(mov: TipoMovimientos): Observable<TipoMovimientos>{
    return this.http
      .post<TipoMovimientos>(`${environment.API_URL}${environment.API_TMOV}`, mov)
      .pipe(catchError(this.handlerError));
  }
  updTMov(idTMovimientos: number, mov: TipoMovimientos): Observable<TipoMovimientos>{
    return this.http
      .put<TipoMovimientos>(`${environment.API_URL}${environment.API_TMOV}${idTMovimientos}`, mov)
      .pipe(catchError(this.handlerError));
  }
  delTMov(idTMovimientos: number): Observable<{}>{
    return this.http
      .delete<TipoMovimientos>(`${environment.API_URL}${environment.API_TMOV}${idTMovimientos}`)
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
