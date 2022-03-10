import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvidedService implements OnDestroy {

  constructor() {
    console.log("ProvidedService constructor");
  }

  ngOnDestroy(): void {
    console.log("ProvidedService ngOnDestroy");
  }
}
