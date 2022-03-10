import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, distinctUntilChanged, map, merge, Observable, shareReplay, Subject, tap } from 'rxjs';
import { getFeatureFlagValue, setFeatureFlagValue, FeatureFlag, DemoRoute } from '@brown-cow/local-storage';

@Injectable({ providedIn: 'root'})
export class FeatureFlagService {
  private overrides: Partial<Record<DemoRoute, Subject<FeatureFlag>>> = {};
  private configApiResponses: Partial<Record<DemoRoute, Observable<FeatureFlag>>> = {};

  constructor(private readonly httpClient: HttpClient) {}

  private getOverride(route: DemoRoute): Subject<FeatureFlag> {
    this.overrides[route] = this.overrides[route] ?? new Subject<FeatureFlag>();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.overrides[route]!;
  }

  getConfig(route: DemoRoute): Observable<FeatureFlag> {
    const url = `https://jsonplaceholder.typicode.com/todos/1?feature_flag=${route}`;

    this.configApiResponses[route] = this.configApiResponses[route] ?? this.httpClient.get(url).pipe(
      delay(10 * 1000),
      map(() => this.getConfigSync(route)),
      tap((featureFlag) => this.setConfig(route, featureFlag)),
      distinctUntilChanged(),
      shareReplay(1),
    );

    return merge(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.configApiResponses[route]!,
      this.getOverride(route),
    )
  }

  getConfigSync(route: DemoRoute): FeatureFlag {
    return getFeatureFlagValue(route);
  }

  setConfig(route: DemoRoute, featureFlag: FeatureFlag): void {
    setFeatureFlagValue(route, featureFlag);

    this.getOverride(route).next(featureFlag);
  }
}
