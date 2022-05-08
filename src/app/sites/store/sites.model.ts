import { Site } from '../../data/sites';

export class SiteModel implements Site {
  id: number;
  name: string;
  owner: string;
  address: string;
  code: string;
  is_deleted: boolean;
}
