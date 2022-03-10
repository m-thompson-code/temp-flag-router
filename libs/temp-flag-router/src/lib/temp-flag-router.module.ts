import { ANALYZE_FOR_ENTRY_COMPONENTS, forwardRef, ModuleWithProviders, NgModule, Optional, Type } from "@angular/core";
import { Router, RouterModule, ROUTES, Routes } from "@angular/router";
import { featureFlagRoutesFactory } from "./factories/feature-flag-routes-factory";
import { FeatureFlagRoutesFactoryService } from "./services/feature-flag-routes-factory/feature-flag-routes-factory.service";
import { DefaultFeatureFlagRoutesService, FeatureFlagRoutesService } from "./services/feature-flag-routes/feature-flag-routes.service";

@NgModule({
    exports: [RouterModule],
    providers: [DefaultFeatureFlagRoutesService]
})
export class FeatureFlagRouterModule {
    // Angular's `RouterModule` injects Router so it gets created eagerly, 
    // so `FeatureFlagRouterModule` will do so as well
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(@Optional() router: Router) {}

    static forChild(routes: Routes, featureFlagRoutesService?: Type<FeatureFlagRoutesService>): ModuleWithProviders<FeatureFlagRouterModule> {
        const serviceType = featureFlagRoutesService ?? DefaultFeatureFlagRoutesService;

        return {
            ngModule: FeatureFlagRouterModule,
            providers: [
                { provide: FeatureFlagRoutesService, useExisting: forwardRef(() => serviceType) },
                FeatureFlagRoutesFactoryService,
                {
                    provide: ROUTES,
                    useFactory: featureFlagRoutesFactory(routes),
                    multi: true,
                    deps: [FeatureFlagRoutesFactoryService, FeatureFlagRoutesService]
                },
                // Providing `ANALYZE_FOR_ENTRY_COMPONENTS` to match how Angular's `provideRoute` Provider helper works
                // They also pass `ROUTES` value as `ANALYZE_FOR_ENTRY_COMPONENTS`
                {provide: ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: ROUTES},
            ],
        };
    }
}
