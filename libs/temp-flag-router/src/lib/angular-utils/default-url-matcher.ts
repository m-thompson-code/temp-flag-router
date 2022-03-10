import { Route, UrlMatchResult, UrlSegment, UrlSegmentGroup } from "@angular/router";

/**
 * `defaultUrlMatcher` from [`angular/packages/router/src/shared.ts`](https://github.com/angular/angular/blob/master/packages/router/src/shared.ts)
 * Since angular doesn't export this function, here is a copy of it using version 13.2.x
 * 
 * This is a known request since this can be useful for extended matcher's default behavior: [github](https://github.com/angular/angular/issues/35928)
 * 
 * Matches the route configuration (`route`) against the actual URL (`segments`).
 */
export function defaultUrlMatcher(
    segments: UrlSegment[], segmentGroup: UrlSegmentGroup, route: Route): UrlMatchResult|null {
  const parts = splitRoutePath(route);//route.path!.split('/');

  if (parts.length > segments.length) {
    // The actual URL is shorter than the config, no match
    return null;
  }

  if (route.pathMatch === 'full' &&
      (segmentGroup.hasChildren() || parts.length < segments.length)) {
    // The config is longer than the actual URL but we are looking for a full match, return null
    return null;
  }

  const posParams: {[key: string]: UrlSegment} = {};

  // Check each config part against the actual URL
  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    const segment = segments[index];
    const isParameter = part.startsWith(':');
    if (isParameter) {
      posParams[part.substring(1)] = segment;
    } else if (part !== segment.path) {
      // The actual URL part does not match the config, no match
      return null;
    }
  }

  return {consumed: segments.slice(0, parts.length), posParams};
}

/**
 * Current behavior for Angular is that they don't allow for path and matcher on `Route`
 * But to use `defaultUrlMatcher`, there must be a path. To avoid issues when path is not defined,
 * defaults to empty array if path is not defined (treated as if path is empty string)
 */
export function splitRoutePath(route: Route): string[] {
  try {
    // This is the original way of splitting the route path in the Angular source code
    return route.path!.split('/');
  } catch(error) {
    // Since we want to also handle if routes only have a matcher while still using the default matcher,
    // we need to avoid runtime error if path is not defined
    // Return empty array instead
    return route.path?.split('/') ?? [];
  }
}
