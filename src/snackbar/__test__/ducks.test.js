import reducer, { actions, initialState, types } from '../ducks';

describe('CLEAR_SNACKBAR_QUEUE', () => {
  it('should clear queue', () => {
    const state = {
      messages: [
        'Some message',
        'Another message',
      ],
    };

    expect(reducer(state, { type: types.CLEAR_SNACKBAR_QUEUE }))
      .toEqual(initialState);
  });
});

describe('HIDE_LATEST_MESSAGE', () => {
  it('should hide latest message', () => {
    const state = {
      messages: [
        'Some message',
        'Another message',
      ],
    };

    expect(reducer(state, { type: types.HIDE_LATEST_MESSAGE }))
      .toEqual({
        messages: ['Another message'],
      });
  });

  it('should return empty array if no messages', () => {
    expect(reducer(initialState, { type: types.HIDE_LATEST_MESSAGE }))
      .toEqual(initialState);
  });
});

describe('SNACKBAR', () => {
  it('should save snackbar message', () => {
    expect(reducer(initialState, actions.showSnackbarMessage('Successful')))
      .toEqual({ messages: ['Successful'] });
  });

  it('should return same state if no type match', () => {
    expect(reducer(initialState, { type: 'SOMETHING', message: 'Hmm' }))
      .toEqual(initialState);
  });
});