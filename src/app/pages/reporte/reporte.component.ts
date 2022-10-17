import { Anio, Meses, ResReporteEmp } from '@/Models/res-reporte-emp.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from '@services/empleados.service';
import { ReporteService } from '@services/reporte.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {


  nombreEmp?='Nombre Empleado';
  puesto?='Puesto Empleado';
  horas?='0';
  salario?=0;
  entregas?='0';
  comision?=0;
  bono?=0;
  subtotal?=0;
  valesDespensa?='0';
  isr?='0';
  costoIsr?=0;
  total?=0;

  anio: Anio[] = [
    {id: 2021, nombre: '2021'},
    {id: 2022, nombre: '2022'},
    {id: 2023, nombre: '2023'},
    {id: 2024, nombre: '2024'},
  ];

  meses: Meses[] = [
    {idMes: 1, nombreMes: 'Enero'},
    {idMes: 2, nombreMes: 'Febrero'},
    {idMes: 3, nombreMes: 'Marzo'},
    {idMes: 4, nombreMes: 'Abril'},
    {idMes: 5, nombreMes: 'Mayo'},
    {idMes: 6, nombreMes: 'Junio'},
    {idMes: 7, nombreMes: 'Julio'},
    {idMes: 8, nombreMes: 'Agosto'},
    {idMes: 9, nombreMes: 'Septiembre'},
    {idMes: 10, nombreMes: 'Octubre'},
    {idMes: 11, nombreMes: 'Noviembre'},
    {idMes: 12, nombreMes: 'Diciembre'}
  ];

  emp:any;
  resRep:any;

  formRep!: FormGroup;
  repEMp!: ResReporteEmp;

  constructor(private http: HttpClient,
    private _formBuilder: FormBuilder,
    private empSrv: EmpleadosService,
    private rptSrv: ReporteService) {

      this.formRep = this._formBuilder.group({
        emp: ['', Validators.required],
        mes: ['', Validators.required],
        anio: ['', Validators.required]
      });
     }


  ngOnInit(): void {
    this.empSrv.getAllEmp().subscribe((emp=>{
      this.emp = emp;
    }));
  }


  FindDtsEmp(){

    var emp   = this.formRep.get('emp')?.value;
    var mes   = this.formRep.get('mes')?.value;
    var anio  = this.formRep.get('anio')?.value;
    // var anio = this.anio.();


    this.rptSrv.getRepByEmp(emp, mes, anio).subscribe(res=>{

      this.repEMp =res;
      this.nombreEmp = res[0].r_fullName;
      this.puesto = res[0].r_rol;
      this.horas = res[0].r_horas;
      this.salario = res[0].r_salario;
      this.entregas = res[0].r_entegas;
      this.comision = res[0].r_comision;
      this.bono = res[0].r_bono;
      this.subtotal = this.salario + this.comision + this.bono;
      this.valesDespensa = res[0].r_valesDespensa;
      this.isr = res[0].r_isr;
      this.costoIsr =this.salario * res[0].r_isr/100;
      this.total = this.subtotal - this.costoIsr;

    })


  }

}
