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

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { InMemoryEventService } from './in-memory-event.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from '../environments/environment';
import { WagonListComponent } from './wagons/wagon-list/wagon-list.component';
import { WagonService } from './wagon.service';
import { WagonCreateComponent } from './wagons/wagon-create/wagon-create.component';
import { WagonUpdateComponent } from './wagons/wagon-update/wagon-update.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(InMemoryEventService)
      : [],
    RouterModule.forRoot([
      { path: '', component: WagonListComponent },
      { path: 'wagons', component: WagonListComponent },
      { path: 'create', component: WagonCreateComponent },
      { path: 'update', component: WagonUpdateComponent },
    ]),
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    WagonListComponent,
    WagonCreateComponent,
  ],
  bootstrap: [AppComponent],
  providers: [InMemoryEventService, WagonService],
})
export class AppModule {}
