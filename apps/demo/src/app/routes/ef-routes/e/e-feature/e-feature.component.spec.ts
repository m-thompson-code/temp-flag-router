import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EFeatureComponent } from './e-feature.component';

describe('EFeatureComponent', () => {
  let component: EFeatureComponent;
  let fixture: ComponentFixture<EFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
