import { FeatureFlagRoutesFactoryService } from '../services/feature-flag-routes-factory/feature-flag-routes-factory.service';

import {
    FeatureFlagRoutes,
    FeatureFlagRoutesFactory,
} from './feature-flag-routes-factory.model';

export const featureFlagRoutesFactory: FeatureFlagRoutesFactory = 
    (featureFlagRoutes: FeatureFlagRoutes) => (featureFlagRoutesFactoryService: FeatureFlagRoutesFactoryService) => {
        return [
            // Override normal `ROUTES` that determine which lazy-loaded child routes to use by using  that use `featureFlag`
            ...featureFlagRoutesFactoryService.getRoutesFromFeatureFlagRoutesGetterService(),

            // Fallback to the normal set of `ROUTES`
            ...featureFlagRoutesFactoryService.getRoutesFromFeatureFlagRoutes(featureFlagRoutes),
        ];
    }
