const initialState = {
    player: {
        name:'',
        title:'',
        description:'',
        uuid:'',
        error_msg:'',
        players: [],
    },
    "initializing": false,
    "initialized": false,
    "error": null
}

const playReducer = (state=initialState, action) => {
    switch(action.type) {
        default:
            return state
        case 'INITIALIZING':
            console.log('Game is initializing')
            return Object.assign({}, state, {initializing: true})
        case 'INITIALIZED':
            console.log('INITIALIZED')
            return Object.assign({}, state, {initialized: true, initializing: false, player: action.payload})
        case 'ERROR':
            console.log('ERROR')
            return Object.assign({}, state, {error: action.payload})
        
        
    }
}

export default playReducer 