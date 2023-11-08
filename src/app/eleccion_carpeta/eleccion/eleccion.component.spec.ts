import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleccionComponent } from './eleccion.component';

describe('EleccionComponent', () => {
  let component: EleccionComponent;
  let fixture: ComponentFixture<EleccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EleccionComponent]
    });
    fixture = TestBed.createComponent(EleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
