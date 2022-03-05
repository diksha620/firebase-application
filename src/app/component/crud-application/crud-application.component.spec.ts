import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudApplicationComponent } from './crud-application.component';

describe('CrudApplicationComponent', () => {
  let component: CrudApplicationComponent;
  let fixture: ComponentFixture<CrudApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
