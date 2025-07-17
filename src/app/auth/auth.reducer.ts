import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure } from './auth.actions';

export interface AuthState {
  token: string | null;
  error: boolean;
}

export const initialState: AuthState = {
  token: null,
  error: false
};

export const authReducer = createReducer(
  initialState,
  on(login, state => ({ ...state, error: false })),
  on(loginSuccess, (state, { token }) => ({ ...state, token, error: false })),
  on(loginFailure, state => ({ ...state, token: null, error: true }))
);
