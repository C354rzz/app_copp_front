import { Empleados } from '@/Models/empleados.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {


  listemp!: Empleados[];
  constructor(private http: HttpClient) { }


  listEmpleados(){
    this.http.get(`${environment.API_URL}${environment.API_EMP}`).toPromise()
    .then(data => {
      this.listemp = data as Empleados[];
    })
  }

  getAllEmp(): Observable<Empleados[]>{
    return this.http
      .get<Empleados[]>(`${environment.API_URL}${environment.API_EMP}`)
      .pipe(catchError(this.handlerError));
      debugger;
  }

  getEmpById(idEmpleados: number): Observable<Empleados>{
    return this.http
      .get<Empleados>(`${environment.API_URL}${environment.API_EMP}${idEmpleados}`)
      .pipe(catchError(this.handlerError));
  }
  newEmp(emp: Empleados): Observable<Empleados>{
    return this.http
      .post<Empleados>(`${environment.API_URL}${environment.API_EMP}`, emp)
      .pipe(catchError(this.handlerError));
  }
  updEmp(idEmpleados: number, emp: Empleados): Observable<Empleados>{
    return this.http
      .put<Empleados>(`${environment.API_URL}${environment.API_EMP}${idEmpleados}`, emp)
      .pipe(catchError(this.handlerError));
  }
  delEmp(idEmpleados: number): Observable<{}>{
    return this.http
      .delete<Empleados>(`${environment.API_URL}${environment.API_EMP}${idEmpleados}`)
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
