import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectToken = createSelector(
  selectAuthState,
  state => state.token
);
export const selectError = createSelector(
  selectAuthState,
  state => state.error
);
