import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { Routes } from '@angular/router';
import { FeatureFlagRoutes, FeatureFlagRouterModule, FeatureFlagRoutesService } from '@brown-cow/temp-flag-router';
import { DemoRoute, FeatureFlag } from '@brown-cow/local-storage';

import { FeatureFlagService } from '../../services/feature-flag/feature-flag.service';

const routes: Routes = [
  {
    path: 'g/:id',
    loadChildren: () => import('./g/g.module').then(m => m.GModule),
  },
  {
    path: 'h/:id',
    loadChildren: () => import('./h/h.module').then(m => m.HModule),
  },
];

@Injectable({
  providedIn: 'root',
})
class FeatureFlagRoutesExample implements FeatureFlagRoutesService {
  constructor(private readonly configService: FeatureFlagService) {}

  getFeatureRoutes(): FeatureFlagRoutes {
    return [
      {
        path: 'g/:id',
        featureFlag: () => this.configService.getConfig(DemoRoute.G).pipe(map((config) => config === FeatureFlag.ON)),
        loadChildren: () => import('./g/g.module').then(m => m.GModule),
        alternativeLoadChildren: () => import('./g-feature/g-feature.module').then(m => m.GFeatureModule),
      },
    ];
  }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatureFlagRouterModule.forChild(routes, FeatureFlagRoutesExample),
  ],
})
export class GHModule {}
