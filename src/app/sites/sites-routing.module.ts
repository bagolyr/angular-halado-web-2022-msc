import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteListComponent } from './site-list/site-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { SiteUpdateComponent } from './site-update/site-update.component';
import { SitesComponent } from './sites/sites.component';

const routes: Routes = [
  {
    path: '',
    component: SitesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: SiteListComponent,
          },
          {
            path: 'sites',
            component: SiteListComponent,
          },
          {
            path: 'sites/edit/:wagonId',
            component: SiteUpdateComponent,
          },
        ],
      },
    ],
  },
  { path: '', redirectTo: '/sites', pathMatch: 'full' },
  { path: '**', component: SiteListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SitesRoutingModule {}
