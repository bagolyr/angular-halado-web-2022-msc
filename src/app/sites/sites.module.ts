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
import { SitesComponent } from './sites/sites.component';
import { SiteListComponent } from '../sites/site-list/site-list.component';
import { SiteService } from '../site.service';
import { SiteUpdateComponent } from '../sites/site-update/site-update.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SitesRoutingModule } from './sites-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTableModule,
    StoreModule,
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(InMemoryEventService)
      : [],
    SitesRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule,
    MatCheckboxModule,
  ],
  declarations: [SitesComponent, SiteListComponent, SiteUpdateComponent],
  providers: [InMemoryEventService, SiteService],
})
export class SitesModule {}
