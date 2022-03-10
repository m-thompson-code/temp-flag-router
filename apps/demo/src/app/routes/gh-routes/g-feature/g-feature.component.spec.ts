import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GFeatureComponent } from './g-feature.component';

describe('GFeatureComponent', () => {
  let component: GFeatureComponent;
  let fixture: ComponentFixture<GFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
