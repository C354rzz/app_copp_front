import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empledados',
  templateUrl: './empledados.component.html',
  styleUrls: ['./empledados.component.scss']
})
export class EmpledadosComponent implements OnInit {

  data:any;
  constructor(private http: HttpClient) {
    this.http.get('https://localhost:7179/api/Empleados').subscribe(data => {

      this.data = data;
      setTimeout(()=>{
        $('#empleados').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu : [5, 10, 25]
        } );
      }, 1);
    }, error => console.error(error));
  }

  ngOnInit(): void {
  }

}
