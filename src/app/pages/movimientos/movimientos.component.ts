import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Rol {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {


  mov:any;
  tmov:any;
  emp:any;
  constructor(private http: HttpClient) {
    this.http.get('https://localhost:7179/api/Movimientos').subscribe(mov => {

      this.mov = mov;
      setTimeout(()=>{
        $('#movimientos').DataTable( {

          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu : [5, 10, 25]
        } );
      }, 1);
    }, error => console.error(error));

    this.http.get('https://localhost:7179/api/TipoMovimientos').subscribe(tmov => {

      this.tmov = tmov;

    }, error => console.error(error));

    this.http.get('https://localhost:7179/api/Empleados').subscribe(emp => {

      this.emp = emp;

    }, error => console.error(error));

  }




  ngOnInit(): void {
  }

}
