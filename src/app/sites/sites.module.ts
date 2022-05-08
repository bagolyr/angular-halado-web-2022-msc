import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';

//import { AppComponent } from '../app.component';
import { HelloComponent } from '../hello.component';
import { InMemoryEventService } from '../in-memory-event.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from '../../environments/environment';
import { SitesComponent } from './sites/sites.component';
import { SiteListComponent } from '../sites/site-list/site-list.component';
import { SiteService } from '../site.service';
//import { WagonCreateComponent } from '../wagons/wagon-create/wagon-create.component';
import { SiteUpdateComponent } from '../sites/site-update/site-update.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SitesRoutingModule } from './sites-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    //BrowserModule,
    CommonModule,
    //BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    //HttpClientModule,
    MatTableModule,
    StoreModule,
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(InMemoryEventService)
      : [],
    SitesRoutingModule,
    /*RouterModule.forRoot([
      { path: '', component: WagonListComponent },
      { path: 'wagons', component: WagonListComponent },
      { path: 'create', component: WagonCreateComponent },
      { path: 'edit', component: WagonUpdateComponent },
      { path: 'edit/:wagonId', component: WagonUpdateComponent },
    ]),*/
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  declarations: [
    SitesComponent,
    SiteListComponent,
    //    WagonCreateComponent,
    SiteUpdateComponent,
  ],
  //bootstrap: [AppComponent],
  providers: [InMemoryEventService, SiteService],
})
export class SitesModule {}
