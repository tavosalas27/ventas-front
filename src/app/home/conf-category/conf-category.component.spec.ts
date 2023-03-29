import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfCategoryComponent } from './conf-category.component';

describe('ConfCategoryComponent', () => {
  let component: ConfCategoryComponent;
  let fixture: ComponentFixture<ConfCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
