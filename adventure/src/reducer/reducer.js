import { NEW_ORDER } from '../pusher/constants';

function orderReducer (state = initialState.orders, action){
switch(action.type){
	case NEW_ORDER:
    return [...state, action.data.order];
	default:
	return state
}
}

export default orderReducer