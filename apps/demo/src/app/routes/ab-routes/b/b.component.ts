import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'brown-cow-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.scss']
})
export class BComponent {
  readonly id$: Observable<string>;

  constructor(private readonly route: ActivatedRoute) {
    this.id$ = this.route.params.pipe(map(params => params['id']));
  }
}
