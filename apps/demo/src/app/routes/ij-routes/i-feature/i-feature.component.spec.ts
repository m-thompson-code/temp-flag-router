import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IFeatureComponent } from './i-feature.component';

describe('IFeatureComponent', () => {
  let component: IFeatureComponent;
  let fixture: ComponentFixture<IFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
