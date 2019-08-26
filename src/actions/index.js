import axios from 'axios';
export const FETCHING_INIT_INFO = 'FETCHING_INIT_INFO';
export const FETCHED_INIT_INFO = 'FETCHED_INIT_INFO';
export const FETCH_NEW_MESSAGE = 'FETCH_NEW_MESSAGE';
export const MOVING_PLAYER = 'MOVING_PLAYER';
export const MOVED_PLAYER = 'MOVED_PLAYER';
export const TALKING_PLAYER = 'TALKING_PLAYER';
export const TALKED_PLAYER = 'TALKED_PLAYER';
export const GRABBED_ITEM = 'GRABBED_ITEM';
export const DROPPED_ITEM = 'DROPPED_ITEM';
export const FETCHED_INVENTORY = 'FETCHED_INVENTORY';
export const EQUIPPED_ITEM = 'EQUIPPED_ITEM';
export const UNEQUIPPED_ITEM = 'UNEQUIPPED_ITEM';
export const FETCHED_PLAYER_STATS = 'FETCHED_PLAYER_STATS';
export const ERROR = 'ERROR';

const heroku = 'https://muddymud.herokuapp.com/api';
const local = 'http://127.0.0.1:8000/api'
const url  = local

export const fetchInitInfo = token => {
    return dispatch => {
        dispatch({ type: FETCHING_INIT_INFO });
        const authToken = `Token ${token}`;

        axios
        .get(`${url}/adv/init/`, { headers: { Authorization: authToken } })
        .then(res => {
            dispatch({ type: FETCHED_INIT_INFO, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: ERROR, payload: err.response });
        });
    };
};

export const fetchNewMessage = message => {
    return {
        type: FETCH_NEW_MESSAGE,
        payload: message
    };
};

export const movePlayer = (direction, token) => {
    return dispatch => {
        dispatch({ type: MOVING_PLAYER });
        const authToken = `Token ${token}`;

        axios
        .post(
            `${url}/adv/move/`,
            { direction },
            { headers: { Authorization: authToken } }
        )
        .then(res => {
            dispatch({ type: MOVED_PLAYER, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: ERROR, payload: err.response });
        });
    };
};

export const talkPlayer = (message, token) => {
    return dispatch => {
        dispatch({ type: TALKING_PLAYER });
        const authToken = `Token ${token}`;

        axios
        .post(
            `${url}/adv/say/`,
            { message },
            { headers: { Authorization: authToken } }
        )
        .then(res => {            
            dispatch({ type: TALKED_PLAYER, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: ERROR, payload: err.response });
        });
    };
};

export const grabItem = (item, token) => {
    return dispatch => {        
        const authToken = `Token ${token}`;
        axios
        .post(
            `${url}/adv/grab/`,
            { item },
            { headers: { Authorization: authToken } }
        )
        .then(res => {            
            dispatch({ type: GRABBED_ITEM, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: ERROR, payload: err.response });
        });
    };
}

export const dropItem = (item, token) => {
    return dispatch => {        
        const authToken = `Token ${token}`;
        axios
        .post(
            `${url}/adv/drop/`,
            { item },
            { headers: { Authorization: authToken } }
        )
        .then(res => {            
            dispatch({ type: DROPPED_ITEM, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: ERROR, payload: err.response });
        });
    };
}

export const fetchInventory = (token) => {
    return dispatch => {        
        const authToken = `Token ${token}`;
        axios
        .get(
            `${url}/adv/inventory/`,            
            { headers: { Authorization: authToken } }
        )
        .then(res => {            
            dispatch({ type: FETCHED_INVENTORY, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: ERROR, payload: err.response });
        });
    };
}

export const equipItem = (item, token) => {
    return dispatch => {        
        const authToken = `Token ${token}`;
        axios
        .post(
            `${url}/adv/equip/`,
            { item },
            { headers: { Authorization: authToken } }
        )
        .then(res => {            
            dispatch({ type: EQUIPPED_ITEM, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: ERROR, payload: err.response });
        });
    };
}

export const unequipItem = (item, token) => {
    return dispatch => {        
        const authToken = `Token ${token}`;
        axios
        .post(
            `${url}/adv/takeOffItem/`,
            { item },
            { headers: { Authorization: authToken } }
        )
        .then(res => {            
            dispatch({ type: UNEQUIPPED_ITEM, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: ERROR, payload: err.response });
        });
    };
}

export const fetchPlayerStats = token => {
    return dispatch => {        
        const authToken = `Token ${token}`;
        axios
        .get(`${url}/adv/getStats/`, { headers: { Authorization: authToken } })
        .then(res => {
            dispatch({ type: FETCHED_PLAYER_STATS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: ERROR, payload: err.response });
        });
    };
};