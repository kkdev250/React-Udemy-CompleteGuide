import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirect: '/',
    });
  });

  it('should store the token upon login', () => {
    const initialState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirect: '/',
    };
    expect(reducer(initialState, {
      type: actionTypes.AUTH_SUCCESS, 
      idToken: 'some-token',
      userId: 'some-user-id'
    })).toEqual({
      token: 'some-token',
      userId: 'some-user-id',
      error: null,
      loading: false,
      authRedirect: '/',
    });
  });
});