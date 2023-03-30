import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidadCompraComponent } from './cantidad-compra.component';

describe('CantidadCompraComponent', () => {
  let component: CantidadCompraComponent;
  let fixture: ComponentFixture<CantidadCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CantidadCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CantidadCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
