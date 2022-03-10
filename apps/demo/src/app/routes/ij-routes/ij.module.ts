import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagRouterModule, FeatureFlagRoutes } from '@brown-cow/temp-flag-router';

(window as any).test = () => { (window as any).featureFlag = !(window as any).featureFlag };

const routes: FeatureFlagRoutes = [
  {
    path: 'i/:id',
    featureFlag: () => (window as any).featureFlag,
    loadChildren: () => import('./i/i.module').then(m => m.IModule),
    alternativeLoadChildren: () => import('./i-feature/i-feature.module').then(m => m.IFeatureModule),
  },
  {
    path: 'j/:id',
    loadChildren: () => import('./j/j.module').then(m => m.JModule),
  },
];

@NgModule({
  imports: [
    CommonModule,
    FeatureFlagRouterModule.forChild(routes)
  ]
})
export class IJModule { }
