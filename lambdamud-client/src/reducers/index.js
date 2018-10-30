import * as actionTypes from '../actions';

const initialState = {
  registeringUser: false,
  loggingInUser: false,
  loggingOutUser: false,
  fetchingInit: false,
  movingPlayer: false,
  title: '',
  description: '',
  name: '',
  players: [],
  data: [],
  uuid: '',
  error: null
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTERING_USER:
      return {
        ...state,
        registeringUser: true
      };
    case actionTypes.REGISTERED_USER:
      return {
        ...state,
        registeringUser: false
      };
    case actionTypes.LOGGING_IN_USER:
      return {
        ...state,
        loggingInUser: true
      };
    case actionTypes.LOGGED_IN_USER:
      return {
        ...state,
        loggingInUser: false,
        error: null
      };
    case actionTypes.LOGGING_OUT_USER:
      return {
        ...state,
        loggingOutUser: true
      };
    case actionTypes.LOGGED_OUT_USER:
      return {
        ...state,
        loggingOutUser: false,
        error: null
      };
    case actionTypes.FETCHING_INIT_INFO:
      return {
        ...state,
        fetchingInit: true
      };
    case actionTypes.FETCHED_INIT_INFO:
      const { title, name, players, description, uuid } = action.payload;
      const message = `${title}: ${description} Other players: ${players.join(
        ' '
      )}`;
      return {
        ...state,
        fetchingInit: false,
        title,
        name,
        players,
        description,
        uuid,
        data: [...state.data, message],
        error: null
      };
    case actionTypes.FETCH_NEW_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    case actionTypes.MOVING_PLAYER:
      return {
        ...state,
        movingPlayer: true
      };
    case actionTypes.MOVED_PLAYER:
      const newMessage = `${action.payload.title}: ${
        action.payload.description
      } Other players: ${action.payload.players.join(' ')}`;
      console.log(newMessage);
      return {
        ...state,
        movingPlayer: false,
        data: [...state.data, newMessage]
      };

    case actionTypes.ERROR:
      return {
        ...state,
        registeringUser: false,
        loggingInUser: false,
        loggingOutUser: false,
        movingPlayer: false,
        error: action.payload
      };
    default:
      return state;
  }
};
