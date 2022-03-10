import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AFeatureComponent } from './a-feature.component';

describe('AFeatureComponent', () => {
  let component: AFeatureComponent;
  let fixture: ComponentFixture<AFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
