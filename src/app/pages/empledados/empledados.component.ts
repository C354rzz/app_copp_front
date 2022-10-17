import { Empleados } from '@/Models/empleados.model';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from '@services/empleados.service';
import { RolesService } from '@services/roles.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

enum Action{
  edit='edit',
  new='new'
}

@Component({
  selector: 'app-empledados',
  templateUrl: './empledados.component.html',
  styleUrls: ['./empledados.component.scss']
})
export class EmpledadosComponent implements OnInit,AfterViewInit, OnDestroy{

  title = 'Nuevo Empleado';
  formEmp!: FormGroup;
  empleado!: any;
  empUpd=0;
  showFormEmp= true;
  isSaveShown = true;
  isUpdShown = false;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  destroy$: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  dtInstance:DataTables.Api;

  data:any;
  empRol:any;
  emp:any;
  actionToDo = Action.new;
  modalEmp : boolean = false;
  empleadoId? =0;
  // nombreEmp?='';
  apellidoEmp?='';
  rolEmp?=0;1

  constructor(private http: HttpClient,
    private _form1Builder: FormBuilder,
    private empSvc: EmpleadosService,
    private rolSvc: RolesService,
    private toastr: ToastrService) {

      this.formEmp = this._form1Builder.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        rol: ['', Validators.required]
      });

      this.rolSvc.getAllEmp().subscribe((rol=>{
        this.empRol = rol;
      }));


    // this.http.get('https://localhost:7179/api/Empleados').subscribe(data => {

    //   this.data = data;
    //   setTimeout(()=>{
    //     $('#empleados').DataTable( {
    //       pagingType: 'full_numbers',
    //       pageLength: 5,
    //       processing: true,
    //       lengthMenu : [5, 10, 25]
    //     } );
    //   }, 1);
    // }, error => console.error(error));
  }

  ngOnInit(): void {
    this.empSvc.getAllEmp().subscribe(emp => {
      this.emp = emp;
        setTimeout(()=>{
          $('#empleados').DataTable( {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu : [5, 10, 25]
          } );
        }, 1);
      });
  }

  openModal(open : boolean, idEmp: number) : void {
    this.modalEmp = open;
    if (idEmp == 0) {
      this.title='Nuevo Empleado';
      this.isSaveShown = true;
      this.isUpdShown = false;
    }else{
      this.isSaveShown = false;
      this.isUpdShown = true;
      this.title='Editar Empleado';
      this.empleadoId = idEmp;
      this.empSvc.getEmpById(idEmp!).subscribe(data => {

         var nombreEmp = data.nombreEmp;
         var apellidosEmp = data.apellidoEmp;
         var rolid = data.rolId;

        console.log(apellidosEmp);
         this.formEmp.patchValue({
          nombre: nombreEmp,
          apellido: apellidosEmp,
          rol: rolid
        });
      });
    }

  }

  reloaddata(){
    var datatable = $('#empleados').DataTable();
    this.empSvc.getAllEmp().subscribe(emp => {
        this.emp = emp;
        datatable.destroy();
        setTimeout(()=>{
          $('#empleados').DataTable( {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu : [5, 10, 25]
          } );
        }, 1);
      });
  };

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.destroy$.next({});
  }

  saveEmp(){
    this.addEmpleado();
    if (this.actionToDo === Action.new) {
      this.addEmpleado();
    }else {
      const movId = this.data?. //.empleado.idEmpleado;
      //this.updMovimiento(movId);
      this.movSvc.listMovimientos();
    }
  }


  addEmpleado(){
    const empleado: Empleados={
      nombreEmp: this.formEmp.get('nombre')?.value,
      apellidoEmp: this.formEmp.get('apellido')?.value,
      rolId: this.formEmp.get('rol')?.value
    };

    this.empSvc.newEmp(empleado).subscribe(data => {
      this.empleadoId = data.IdEmpleado;
      this.toastr.success('Registro Guardado Correctamente','Empleado Guardado');
      this.formEmp.reset();
      this.openModal(false,0);
      this.reloaddata();
    });

  }


  delEmp(idemp: number){
    if (window.confirm('Deseas eliminar este empleado?')) {
      this.empSvc.delEmp(idemp).subscribe(res=>{
          this.reloaddata();
      })
    }
  }

  updEmpleado() {
    // console.log(empId);
    var idemp = this.empleadoId;
    const empleado: Empleados= {
      IdEmpleado:idemp,
      nombreEmp: this.formEmp.get('nombre')?.value,
      apellidoEmp: this.formEmp.get('apellido')?.value,
      rolId: this.formEmp.get('rol')?.value
    };

    this.empSvc.updEmp(idemp!, empleado).subscribe(data => {
      this.toastr.success('Registro Actualizado Correctamente','Empleado Actualizado')
      this.reloaddata();
      this.openModal(false,0);
      this.formEmp.reset();
    });
  }
}
