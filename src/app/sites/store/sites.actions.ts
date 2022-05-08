import { createAction, props } from '@ngrx/store';
import { SiteModel } from './sites.model';

export enum SiteActionTypes {
  SitesRequested = '[Sites] Sites Requested',
  SitesLoaded = '[Sites] Sites Loaded',
  siteCreate = '[Sites] site Create',
  siteCreated = '[Sites] site Created',
  siteRequested = '[Sites] site Requested',
  siteLoaded = '[Sites] site Loaded',
  siteUpdate = '[Sites] site Update',
  siteUpdated = '[Sites] site Updated',
  siteDelete = '[Sites] site Delete',
  siteDeleted = '[Sites] site Deleted',
}

export const SitesRequestedAction = createAction(
  SiteActionTypes.SitesRequested
);
export const SitesLoadedAction = createAction(
  SiteActionTypes.SitesLoaded,
  props<{ Sites: SiteModel[] }>()
);
export const siteCreateAction = createAction(
  SiteActionTypes.siteCreate,
  props<{ site: SiteModel }>()
);
export const siteCreatedAction = createAction(
  SiteActionTypes.siteCreated,
  props<{ site: SiteModel }>()
);
export const siteRequestedAction = createAction(
  SiteActionTypes.siteRequested,
  props<{ siteId: number }>()
);
export const siteLoadedAction = createAction(
  SiteActionTypes.siteLoaded,
  props<{ site: SiteModel }>()
);
export const siteUpdateAction = createAction(
  SiteActionTypes.siteUpdate,
  props<{ site: SiteModel }>()
);
export const siteUpdatedAction = createAction(
  SiteActionTypes.siteUpdated,
  props<{ site: SiteModel }>()
);
export const siteDeleteAction = createAction(
  SiteActionTypes.siteDelete,
  props<{ site: SiteModel }>()
);
export const siteDeletedAction = createAction(
  SiteActionTypes.siteDeleted,
  props<{ site: SiteModel }>()
);

/*export const deleteEvent = createAction(
  '[Events] Delete Event',
  props<{eventId}>()
);*/
