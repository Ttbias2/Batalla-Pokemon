import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeleaComponent } from './pelea.component';

describe('PeleaComponent', () => {
  let component: PeleaComponent;
  let fixture: ComponentFixture<PeleaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeleaComponent]
    });
    fixture = TestBed.createComponent(PeleaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
