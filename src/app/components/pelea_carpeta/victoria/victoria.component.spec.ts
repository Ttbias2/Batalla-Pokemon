import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VictoriaComponent } from './victoria.component';

describe('VictoriaComponent', () => {
  let component: VictoriaComponent;
  let fixture: ComponentFixture<VictoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VictoriaComponent]
    });
    fixture = TestBed.createComponent(VictoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
