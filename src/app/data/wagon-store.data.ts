import { SiteTable } from './site-store.data';

export interface Wagon {
  id: number;
  identifier: string;
  date_of_production: number;
  track_number: string;
  owner: string;
  siteID: number;
  is_deleted: boolean;
  siteName?: string;
}

export class WagonTable {
  public static _wagons: Wagon[] = [
    {
      id: 1,
      identifier: 'Bhv',
      date_of_production: 2020,
      track_number: '50 55 20-05 555-7',
      owner: 'WagonOwner1',
      siteID: 1,
      is_deleted: false,
    },
    {
      id: 2,
      identifier: 'BDbhv',
      date_of_production: 2021,
      track_number: '50 55 20-05 555-8',
      owner: 'WagonOwner2',
      siteID: 1,
      is_deleted: false,
    },
    {
      id: 3,
      identifier: 'AcBc',
      date_of_production: 2022,
      track_number: '50 55 20-05 555-9',
      owner: 'WagonOwner3',
      siteID: 2,
      is_deleted: false,
    },
  ];

  public static wagons: Wagon[] = WagonTable._wagons.map((wagon) => {
    const site = SiteTable.sites.find((a) => a.id === wagon.siteID);
    wagon.siteName = site.name;
    return wagon;
  });
}
