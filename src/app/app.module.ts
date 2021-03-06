import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { InMemoryEventService } from './in-memory-event.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from '../environments/environment';
import { WagonListComponent } from './wagons/wagon-list/wagon-list.component';
import { WagonService } from './wagon.service';
import { WagonCreateComponent } from './wagons/wagon-create/wagon-create.component';
import { WagonUpdateComponent } from './wagons/wagon-update/wagon-update.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    HttpClientModule,
    MatTableModule,
    StoreModule,
    AppRoutingModule,
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(InMemoryEventService)
      : [],
    AppRoutingModule,
    /*RouterModule.forRoot([
      { path: '', component: WagonListComponent },
      { path: 'wagons', component: WagonListComponent },
      { path: 'create', component: WagonCreateComponent },
      { path: 'edit', component: WagonUpdateComponent },
      { path: 'edit/:wagonId', component: WagonUpdateComponent },
    ])*/ MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
  providers: [InMemoryEventService, WagonService, AuthService],
})
export class AppModule {}
