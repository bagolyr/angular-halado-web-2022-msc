import { createAction, props } from '@ngrx/store';
import { WagonModel } from './wagons.model';

export enum WagonActionTypes {
  wagonsRequested = '[Wagons] Wagons Requested',
  wagonsLoaded = '[Wagons] Wagons Loaded',
  wagonCreate = '[Wagons] Wagon Create',
  wagonCreated = '[Wagons] Wagon Created',
  wagonRequested = '[Wagons] Wagon Requested',
  wagonLoaded = '[Wagons] Wagon Loaded',
  wagonUpdate = '[Wagons] Wagon Update',
  wagonUpdated = '[Wagons] Wagon Updated',
  wagonDelete = '[Wagons] Wagon Delete',
  wagonDeleted = '[Wagons] Wagon Deleted',
}

export const wagonsRequestedAction = createAction(
  WagonActionTypes.wagonsRequested
);
export const wagonsLoadedAction = createAction(
  WagonActionTypes.wagonsLoaded,
  props<{ wagons: WagonModel[] }>()
);
export const wagonCreateAction = createAction(
  WagonActionTypes.wagonCreate,
  props<{ wagon: WagonModel }>()
);
export const wagonCreatedAction = createAction(
  WagonActionTypes.wagonCreated,
  props<{ wagon: WagonModel }>()
);
export const wagonRequestedAction = createAction(
  WagonActionTypes.wagonRequested,
  props<{ wagonId: number }>()
);
export const wagonLoadedAction = createAction(
  WagonActionTypes.wagonLoaded,
  props<{ wagon: WagonModel }>()
);
export const wagonUpdateAction = createAction(
  WagonActionTypes.wagonUpdate,
  props<{ wagon: WagonModel }>()
);
export const wagonUpdatedAction = createAction(
  WagonActionTypes.wagonUpdated,
  props<{ wagon: WagonModel }>()
);
export const wagonDeleteAction = createAction(
  WagonActionTypes.wagonDelete,
  props<{ wagon: WagonModel }>()
);
export const wagonDeletedAction = createAction(
  WagonActionTypes.wagonDeleted,
  props<{ wagon: WagonModel }>()
);

/*export const deleteEvent = createAction(
  '[Events] Delete Event',
  props<{eventId}>()
);*/
