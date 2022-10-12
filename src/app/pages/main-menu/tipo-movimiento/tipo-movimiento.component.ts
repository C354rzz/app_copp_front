import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-movimiento',
  templateUrl: './tipo-movimiento.component.html',
  styleUrls: ['./tipo-movimiento.component.scss']
})
export class TipoMovimientoComponent implements OnInit {

  data:any;
  constructor(private http: HttpClient) {
    this.http.get('https://localhost:7179/api/TipoMovimientos').subscribe(data => {

      this.data = data;
      setTimeout(()=>{
        $('#tmovimiento').DataTable( {
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
