import { Route, Routes } from "@angular/router";
import { Observable } from "rxjs";

import { FeatureFlagRoutesFactoryService } from "../services/feature-flag-routes-factory/feature-flag-routes-factory.service";

/**
 * `FeatureFlagRoute` extends `Route`
 * 
 * All properties are the same as `Route` except that `loadChildren` is required instead of optional
 * 
 * When using `FeatureFlagRoute` to navigate, `featureFlag` determines
 * if `loadChildren` or `alternativeLoadChildren` is used when lazy loading module for navigation
 * 
 * If `featureFlag`'s latest value is `false`, `loadChildren` is used,
 * and if `featureFlag`'s latest value is `true`, `alternativeLoadChildren` is used instead.
 */
export interface FeatureFlagRoute extends Route {
  /**
   * An object specifying lazy-loaded child routes.
   * 
   * if `alternativeLoadChildren` and `featureFlag` are also defined, 
   * `loadChildren` will be used to lazy-load child routes when `featureFlag`'s latest value is `false`
   */
  loadChildren: NonNullable<Route['loadChildren']>;
  /**
   * An object specifying lazy-loaded child routes.
   * 
   * if `loadChildren` and `featureFlag` are also defined, 
   * `alternativeLoadChildren` will be used to lazy-load child routes when `featureFlag`'s latest value is `true`
   */
  alternativeLoadChildren: NonNullable<Route['loadChildren']>;
  /**
   * Used to determine if navigation to this route should use `loadChildren` or `alternativeLoadChildren`
   * to lazy-load child routes.
   * 
   * If `featureFlag`'s latest value is `false`, `loadChildren` is used,
   * and if `featureFlag`'s latest value is `true`, `alternativeLoadChildren` is used instead.
   */
  featureFlag: () => boolean | Observable<boolean> | Promise<boolean>;
}

export type FeatureFlagRoutes = (FeatureFlagRoute | Route & {
  alternativeLoadChildren?: never;
  featureFlag?: never;
})[];

export type FeatureFlagRoutesFactory = (routes: Routes) => (featureFlagRoutesFactoryService: FeatureFlagRoutesFactoryService) => Routes
