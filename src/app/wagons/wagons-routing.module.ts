import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WagonListComponent } from './wagon-list/wagon-list.component';
import { WagonsComponent } from './wagons/wagons.component';
//import { EventSocialComponent } from './event-social/event-social.component';
//import { EventDetailsComponent } from './event-details/event-details.component';
//import { EventCreateComponent } from './event-create/event-create.component';
import { AuthGuard } from '../auth/auth.guard';
import { WagonUpdateComponent } from '../wagons/wagon-update/wagon-update.component';

const routes: Routes = [
  {
    path: '',
    component: WagonsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: WagonListComponent,
          },
          {
            path: 'wagons',
            component: WagonListComponent,
          },
          {
            path: 'edit',
            component: WagonUpdateComponent,
          },
          {
            path: 'wagons/edit/:wagonId',
            component: WagonUpdateComponent,
          },
        ],
      },
    ],
  },
  { path: '', redirectTo: '/wagons', pathMatch: 'full' },
  { path: '**', component: WagonListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WagonsRoutingModule {}
