export const types = {
  CLEAR_SNACKBAR_QUEUE: '@@SNACKBAR/CLEAR_QUEUE',
  HIDE_LATEST_MESSAGE: '@@SNACKBAR/HIDE_LATEST',
  INIT_SNACKBAR_TIMEOUT: '@@SNACKBAR/INIT_TIMEOUT',  // for saga
};

export const initialState = { ...{
  messages: [],
} };

export default (state = initialState, action) => {
  switch(action.type) {
    case types.CLEAR_SNACKBAR_QUEUE:
      return initialState;
    case types.HIDE_LATEST_MESSAGE:
      return { ...state, messages: [...state.messages.slice(1)] };
    case 'SNACKBAR':
      return { ...state, messages: [...state.messages, action.message] };

    default:
      return state;
  }
};