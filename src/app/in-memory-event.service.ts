import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { SiteTable } from './data/sites';
import { WagonTable } from './data/wagons';

@Injectable()
export class InMemoryEventService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const db = {
      sites: SiteTable.sites,
      wagons: WagonTable.wagons,
    };
    return db;
  }
}
