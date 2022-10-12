import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpledadosComponent } from './empledados.component';

describe('EmpledadosComponent', () => {
  let component: EmpledadosComponent;
  let fixture: ComponentFixture<EmpledadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpledadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpledadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
