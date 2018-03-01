export const types = {
  RESET_NOTIFICATIONS: '@@NOTIF/RESET',
};

export const initialState = { ...{
  error: null,
  info: null,
} };

export default (state = initialState, action) => {
  const { type, error, info } = action;

  if (type === types.RESET_NOTIFICATIONS) {
    return initialState;
  } else if (error) {
    return { ...state, error };
  } else if (info) { 
    return { ...state, error: null, info };
  }

  return state;
};