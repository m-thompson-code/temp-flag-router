import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'brown-cow-j',
  templateUrl: './j.component.html',
  styleUrls: ['./j.component.scss']
})
export class JComponent {
  readonly id$: Observable<string>;

  constructor(private readonly route: ActivatedRoute) {
    this.id$ = this.route.params.pipe(map(params => params['id']));
  }
}
