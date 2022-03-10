import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'brown-cow-e',
  templateUrl: './e.component.html',
  styleUrls: ['./e.component.scss']
})
export class EComponent {
  readonly id$: Observable<string>;

  constructor(private readonly route: ActivatedRoute) {
    this.id$ = this.route.params.pipe(map(params => params['id']));
  }
}
