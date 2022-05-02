import { SiteTable } from './site_store';

export interface Wagon {
  id: number;
  identifier: string;
  date_of_production: number;
  track_number: string;
  owner: string;
  siteID: number;
}

export class WagonTable {
  public static authors: Wagon[] = [
    {
      id: 1,
      identifier: 'Bhv',
      date_of_production: 2020,
      track_number: '50 55 20-05 555-7',
      owner: 'WagonOwner1',
      siteID: 1,
    },
    {
      id: 2,
      identifier: 'BDbhv',
      date_of_production: 2021,
      track_number: '50 55 20-05 555-8',
      owner: 'WagonOwner2',
      siteID: 1,
    },
    {
      id: 3,
      identifier: 'AcBc',
      date_of_production: 2022,
      track_number: '50 55 20-05 555-9',
      owner: 'WagonOwner3',
      siteID: 2,
    },
  ];
}
