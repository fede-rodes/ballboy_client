// KEEP IN SYNC WITH SERVER CONSTANTS
// TODO: use tj enum instead
import Constants from 'expo-constants';

export const SPORTS = {
  FOOTBALL: 'FOOTBALL',
  VOLLEYBALL: 'VOLLEYBALL',
  BEACH_VOLLEYBALL: 'BEACH_VOLLEYBALL',
  TENNIS: 'TENNIS',
  TABLE_TENNIS: 'TABLE_TENNIS',
  ABSOLUTE_FRISBEE: 'ABSOLUTE_FRISBEE',
  BASKETBALL: 'BASKETBALL',
  BADMINTON: 'BADMINTON',
};

export const ACTIVITY_STATUSES = {
  ACTIVE: 'ACTIVE',
  CANCELED: 'CANCELED',
  FINISHED: 'FINISHED',
  DELETED: 'DELETED',
};

export const ATTENDEE_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
};

// TODO: we should probably introduce a Cities collection instead
// TODO: apply i18n
export const CITIES = Constants.manifest.extra.cities;

