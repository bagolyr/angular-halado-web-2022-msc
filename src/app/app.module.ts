import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { InMemoryEventService } from './in-memory-event.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from '../environments/environment';
import { WagonListComponent } from './wagons/wagon-list/wagon-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(InMemoryEventService)
      : [],
    RouterModule.forRoot([
      { path: '', component: WagonListComponent },
      { path: 'wagons', component: WagonListComponent },
    ]),
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
