import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagRoutes, FeatureFlagRouterModule } from '@brown-cow/temp-flag-router';
import { getFeatureFlagValue, FeatureFlag, DemoRoute } from '@brown-cow/local-storage';

const routes: FeatureFlagRoutes = [
  {
    path: 'a/:id',
    loadChildren: () => import('./a/a.module').then(m => m.AModule),
    alternativeLoadChildren: () => import('./a-feature/a-feature.module').then(m => m.AFeatureModule),
    featureFlag: () => getFeatureFlagValue(DemoRoute.A) === FeatureFlag.ON,
  },
  {
    path: 'b/:id',
    loadChildren: () => import('./b/b.module').then(m => m.BModule),
  },
];

@NgModule({
  imports: [
    CommonModule,
    FeatureFlagRouterModule.forChild(routes),
  ],
})
export class ABModule {
}
