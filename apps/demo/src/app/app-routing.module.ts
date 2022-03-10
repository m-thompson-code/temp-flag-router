import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'routes',
    loadChildren: () => import('./routes/ab-routes/ab.module').then(m => m.ABModule),
  },
  {
    path: 'other',
    loadChildren: () => import('./routes/cd-routes/cd.module').then(m => m.CDModule),
  },
  {
    path: 'root/e/:id',
    loadChildren: () => import('./routes/ef-routes/e/e.module').then(m => m.EModule),
  },
  {
    path: 'root/f/:id',
    loadChildren: () => import('./routes/ef-routes/f/f.module').then(m => m.FModule),
  },
  {
    path: 'moar',
    loadChildren: () => import('./routes/gh-routes/gh.module').then(m => m.GHModule),
  },
  {
    path: 'even-moar',
    loadChildren: () => import('./routes/ij-routes/ij.module').then(m => m.IJModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
