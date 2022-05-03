import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WagonsComponent } from './wagons/wagons.component';
import { AuthGuard } from '../auth/auth.guard';
import { WagonListComponent } from './wagon-list/wagon-list.component';
import { WagonService } from '../wagon.service';
import { WagonCreateComponent } from './wagon-create/wagon-create.component';
import { WagonUpdateComponent } from './wagon-update/wagon-update.component';

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
          /*{
          path: 'details/:eventId',
          component: EventDetailsComponent
        },*/
          {
            path: 'edit/:wagonId',
            component: WagonUpdateComponent,
          },
          {
            path: 'create',
            component: WagonCreateComponent,
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
export class BooksRoutingModule {}
