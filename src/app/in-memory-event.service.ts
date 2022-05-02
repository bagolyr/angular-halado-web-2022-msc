import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
/*import { EventTable } from './event-list/events';*/
import { SiteTable } from './data/site_store.data';
import { WagonTable } from './data/wagon_store.data';

@Injectable()
export class InMemoryEventService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const db = {
      /*events: EventTable.events,*/
      sites: SiteTable.sites,
      wagons: WagonTable.wagons,
    };
    return db;
  }
}
