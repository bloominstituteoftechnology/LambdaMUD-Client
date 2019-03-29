import * as actionTypes from "../actions";

const initialState = {
  fetchingInit: false,
  movingPlayer: false,
  talkingPlayer: false,
  title: "",
  description: "",
  name: "",
  players: [],
  data: [],
  uuid: "",
  error: null
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCHING_INIT_INFO:
      return {
        ...state,
        fetchingInit: true
      };
    case actionTypes.FETCHED_INIT_INFO:
      const { title, name, players, description, uuid, items } = action.payload;
      const message = `${title}:\n\n    ${description} \n\nOther players: ${players.join(
        " "
      )}\nItems: ${items.join(" ")}`;
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
      const newMessage = `${action.payload.title}:\n\n    ${
        action.payload.description
      } \n\nOther players: ${action.payload.players.join(
        " "
      )}\nItems: ${action.payload.items.join(" ")}`;
      return {
        ...state,
        movingPlayer: false,
        data: [...state.data, newMessage]
      };
    case actionTypes.TALKING_PLAYER:
      return {
        ...state,
        talkingPlayer: true
      };
    case actionTypes.TALKED_PLAYER:
      const selfMessage = `You said "${
        action.payload.message
      }" to the players in the area.`;
      return {
        ...state,
        talkingPlayer: false,
        data: [...state.data, selfMessage]
      };

    case actionTypes.GRABBED_ITEM:
      let selfGrabItemMessage = "";
      if (action.payload.error === true) {
        selfGrabItemMessage = "That item does not exist.";
      } else {
        selfGrabItemMessage = `You grabbed "${
          action.payload.item
        }" from the area.`;
      }
      return {
        ...state,
        talkingPlayer: false,
        data: [...state.data, selfGrabItemMessage]
      };

    case actionTypes.DROPPED_ITEM:
      let selfDroppedItemMessage = "";
      if (action.payload.error === true) {
        selfDroppedItemMessage = "You do not have that item.";
      } else {
        selfDroppedItemMessage = `You dropped "${action.payload.item}".`;
      }
      return {
        ...state,
        talkingPlayer: false,
        data: [...state.data, selfDroppedItemMessage]
      };
    
      case actionTypes.FETCHED_INVENTORY:
      let inventoryMessage = "";
      if (action.payload.error === true) {
        inventoryMessage = "You do not have that item.";
      } else {
        inventoryMessage = `You are holding "${action.payload.items}".`;
      }
      return {
        ...state,
        talkingPlayer: false,
        data: [...state.data, inventoryMessage]
      };

    case actionTypes.ERROR:
      return {
        ...state,
        movingPlayer: false,
        talkingPlayer: false,
        error: action.payload
      };
    default:
      return state;
  }
};
