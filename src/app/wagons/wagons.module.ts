import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';

import { HelloComponent } from '../hello.component';
import { InMemoryEventService } from '../in-memory-event.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from '../../environments/environment';
import { WagonsComponent } from './wagons/wagons.component';
import { WagonListComponent } from '../wagons/wagon-list/wagon-list.component';
import { WagonService } from '../wagon.service';
import { WagonCreateComponent } from '../wagons/wagon-create/wagon-create.component';
import { WagonUpdateComponent } from '../wagons/wagon-update/wagon-update.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { WagonsRoutingModule } from './wagons-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SiteService } from '../site.service';
import { MatSortModule } from '@angular/material/sort';
import { CustomPipe } from '../custom-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTableModule,
    MatMenuModule,
    StoreModule,
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(InMemoryEventService)
      : [],
    WagonsRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule,
  ],
  declarations: [
    WagonsComponent,
    WagonListComponent,
    WagonCreateComponent,
    WagonUpdateComponent,
    CustomPipe,
  ],
  providers: [InMemoryEventService, WagonService, SiteService],
})
export class WagonModule {}
