import { Movimientos } from '@/Models/movimientos.model';
import { ResReporteEmp } from '@/Models/res-reporte-emp.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  listmov!: Movimientos[];

  constructor(private http: HttpClient) { }

  listMovimientos(){
    this.http.get(`${environment.API_URL}${environment.API_MOV}`).toPromise()
    .then(data => {
      this.listmov = data as Movimientos[];
    })
  }

  getRepByEmp(idEmp: number, mes:number, anio: number): Observable<ResReporteEmp>{
    return this.http
      .get<ResReporteEmp>(`${environment.API_URL}${environment.API_REP}${idEmp}?_mes=${mes}&_anio=${anio}`)
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
