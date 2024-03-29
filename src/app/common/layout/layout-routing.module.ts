import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:
      [
        {
          path: 'dashboard',
          loadChildren: () => import('./../../dashboard/dashboard.module').then(m => m.DashboardModule),
        },
        {
          path: '',
          redirectTo: '/dashboard',
          pathMatch: 'full'
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
