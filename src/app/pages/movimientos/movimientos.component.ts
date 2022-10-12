import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MovimientoService } from '../../services/movimiento.service';
import { Movimientos } from '@/Models/movimientos.model';
import { TMovimientoService } from '@services/tmovimiento.service';
import { TipoMovimientos } from '../../Models/tipo-movimientos.model';
import { ToastrModule } from 'ngx-toastr';
import { EmpleadosService } from '@services/empleados.service';

interface Rol {
  value: string;
  viewValue: string;
}
enum Action{
  edit='edit',
  new='new'
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
  data:any;

  title = 'Nuevo Movimiento';
  formMov!: FormGroup;
  movimiento!: Movimientos;
  tmovimiento!: TipoMovimientos;
  actionToDo = Action.new;
  movimientioId? =0;
  tMovimientoId?=0;

  constructor(private http: HttpClient,
    private _formBuilder: FormBuilder,
    private movSvc: MovimientoService,
    private empSvc: EmpleadosService,
    private tmovSvc: TMovimientoService,) {

      this.formMov = this._formBuilder.group({
        empl: ['', Validators.required],
        movi: ['', Validators.required],
        cant: ['', Validators.required],
        costo: ['', Validators.required],
        bono: ['', Validators.required],
        tot: ['', Validators.required]
      });


    this.http.get('https://localhost:7179/api/Movimientos').subscribe(mov => {

      this.mov = mov;
      setTimeout(()=>{
        $('#movimientos').DataTable( {

          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu : [5, 10, 25],

          columnDefs: [
            {
                "targets": [0],
                "render": $.fn.dataTable.moment('DD/MM/YYYY')
            }
          ]
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

  changeTMov(idtmov: number){
    if (idtmov) {
      this.tmovSvc.getTMovById(idtmov!).subscribe(data => {
        this.formMov.patchValue({costo: data.costo});
      // console.log(data.costo, " ",idtmov);
    });
    }
  }

  changeCant(cantidad: number){

    var cant:number = cantidad;
    var costo:number = this.formMov.get('costo')?.value;
    var tot:number = cant * costo;
    this.formMov.patchValue({tot: tot});

    var idemp:number = this.formMov.get('empl')?.value;
    var idtmov:number = this.formMov.get('movi')?.value;

    if (idemp) {
      this.empSvc.getEmpById(idemp!).subscribe(data => {
        var idrol = data.rolId;
        var bon = 0;

          if (idtmov == 1 && idrol == 1) {
            var bon = cant * 10;
          } else {
            if (idtmov == 1 && idrol == 2) {
              var bon = cant * 5;
            }
          }
          this.formMov.patchValue({bono: bon});
        // console.log(data.rolId);
      });
    }

  }

  changeEmp(){
    this.formMov.patchValue({
      movi: '',
      cant: '',
      costo: '',
      bono: '',
      tot: '',
    });
  }


  saveMov(){
    if (this.actionToDo === Action.new) {
      this.addMovimiento();
    }else {
      const movId = this.data?. //.empleado.idEmpleado;
      //this.updMovimiento(movId);
      this.movSvc.listMovimientos();
    }
  }

  addMovimiento(){
    const movimiento: Movimientos={
      fechaMov: new Date(),
      tipoMovimientoId: this.formMov.get('movi')?.value,
      empleadoId: this.formMov.get('empl')?.value,
      cantidad: this.formMov.get('cant')?.value,
      costo: this.formMov.get('costo')?.value,
      total: this.formMov.get('tot')?.value
    };

    this.movSvc.newMov(movimiento).subscribe(data => {
      this.movimientioId = data.idMovimiento;
      console.log('NuevoMov=>',data);
      this.movSvc.listMovimientos();
      this.formMov.reset();
    });

  }

  updMovimiento(movId: number) {
    // console.log(empId);

    const movimiento: Movimientos={
      fechaMov: this.formMov.get('name')?.value,
      tipoMovimientoId: this.formMov.get('apellido')?.value,
      empleadoId: this.formMov.get('fecNac')?.value,
      cantidad: this.formMov.get('rfc')?.value,
      costo: this.formMov.get('correo')?.value,
      total: this.formMov.get('ref')?.value
    };

    this.movSvc.updMov(movId!, movimiento).subscribe(data => {
      this.formMov.reset();
    });
  }


}
