import reducer, { initialState, types } from '../ducks';

describe('RESET_NOTIFICATIONS', () => {
  it('should reset all notifications', () => {
    const state = {
      error: 'Some error message',
      info: 'Some info message',
    };

    expect(reducer(state, { type: types.RESET_NOTIFICATIONS }))
      .toEqual(initialState);
  });
});

describe('error', () => {
  it('should set error message', () => {
    const action = {
      type: 'DOES_NOT_MATTER',
      error: 'Some message',
    };

    expect(reducer(initialState, action))
      .toEqual({
        ...initialState,
        error: action.error,
      });
  });
});

describe('info', () => {
  it('should set info message', () => {
    const action = {
      type: 'DOES_NOT_MATTER',
      info: 'Some info message',
    };

    expect(reducer(initialState, action))
      .toEqual({
        ...initialState,
        info: action.info,
      });
  });
});