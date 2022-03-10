import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'brown-cow-e-feature',
  templateUrl: './e-feature.component.html',
  styleUrls: ['./e-feature.component.scss']
})
export class EFeatureComponent {
  readonly id$: Observable<string>;

  constructor(private readonly route: ActivatedRoute) {
    this.id$ = this.route.params.pipe(map(params => params['id']));
  }
}
