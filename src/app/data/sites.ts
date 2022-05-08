export interface Site {
  id: number;
  name: string;
  owner: string;
  address: string;
  code: string;
  is_deleted: boolean;
}

export class SiteTable {
  public static sites: Site[] = [
    {
      id: 1,
      name: 'Name1',
      owner: 'SiteOwner1',
      address: 'Celldömölk',
      code: '02170',
      is_deleted: false,
    },
    {
      id: 2,
      name: 'Name2',
      owner: 'SiteOwner1',
      address: 'Szombathely',
      code: '02171',
      is_deleted: false,
    },
    {
      id: 3,
      name: 'Name3',
      owner: 'SiteOwner2',
      address: 'Győr',
      code: '02172',
      is_deleted: false,
    },
  ];
}
