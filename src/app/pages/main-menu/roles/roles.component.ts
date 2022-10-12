import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  data:any;
  constructor(private http: HttpClient) {
    this.http.get('https://localhost:7179/api/Roles').subscribe(data => {

      this.data = data;
      setTimeout(()=>{
        $('#datatableexample').DataTable( {
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
