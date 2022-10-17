import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarioxdiaComponent } from './salarioxdia.component';

describe('SalarioxdiaComponent', () => {
  let component: SalarioxdiaComponent;
  let fixture: ComponentFixture<SalarioxdiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalarioxdiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalarioxdiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
