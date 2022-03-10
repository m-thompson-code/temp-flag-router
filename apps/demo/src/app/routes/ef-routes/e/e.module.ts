import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagRouterModule, FeatureFlagRoutes } from '@brown-cow/temp-flag-router';

import { EComponent } from './e.component';

(window as any).test = () => { (window as any).featureFlag = !(window as any).featureFlag };

const routes: FeatureFlagRoutes = [
  {
    path: '',
    component: EComponent
  },

  {
    path: 'feature',
    featureFlag: () => !!(window as any).featureFlag,
    loadChildren: () => import('../../not-found/not-found.module').then(m => m.NotFoundModule),
    alternativeLoadChildren: () => import('./e-feature/e-feature.module').then(m => m.EFeatureModule),
  },
];

@NgModule({
  declarations: [EComponent],
  imports: [
    CommonModule,
    FeatureFlagRouterModule.forChild(routes)
  ],
})
export class EModule { }
