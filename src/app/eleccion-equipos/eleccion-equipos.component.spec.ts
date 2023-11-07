import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleccionEquiposComponent } from './eleccion-equipos.component';

describe('EleccionEquiposComponent', () => {
  let component: EleccionEquiposComponent;
  let fixture: ComponentFixture<EleccionEquiposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EleccionEquiposComponent]
    });
    fixture = TestBed.createComponent(EleccionEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
