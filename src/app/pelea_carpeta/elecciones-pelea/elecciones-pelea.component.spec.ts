import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleccionesPeleaComponent } from './elecciones-pelea.component';

describe('EleccionesPeleaComponent', () => {
  let component: EleccionesPeleaComponent;
  let fixture: ComponentFixture<EleccionesPeleaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EleccionesPeleaComponent]
    });
    fixture = TestBed.createComponent(EleccionesPeleaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
