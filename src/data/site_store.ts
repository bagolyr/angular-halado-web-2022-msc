export interface Site {
  id: number;
  name: string;
  owner: string;
  address: string;
  code: number;
}

export class SiteTable {
  public static sites: Site[] = [
    {
      id: 1,
      name: 'Name1',
      owner: 'SiteOwner1',
      address: 'Celldomolk',
      code: 02170,
    },
    {
      id: 2,
      name: 'Name2',
      owner: 'SiteOwner1',
      address: 'Szombathely',
      code: 02171,
    },
  ];
}
