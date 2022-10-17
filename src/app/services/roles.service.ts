import { Roles } from '@/Models/roles.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getAllEmp(): Observable<Roles[]>{
    return this.http
      .get<Roles[]>(`${environment.API_URL}${environment.API_ROL}`)
      .pipe(catchError(this.handlerError));
      debugger;
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
