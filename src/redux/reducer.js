const initialState = {
    username: '',
    profilePic: ''
}

const UPDATE_USER = 'UPDATE_USER';
const LOGOUT = 'LOGOUT';

export function reducer (state = initialState, action){
    let { type, payload } = action;
    switch (type){
        case UPDATE_USER:
            return{...state, username: payload.username, profilePic: payload.profilePic};
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export function updateUser(user){
    return {
        type: 'updateUser',
        payload: user
    }
}

export function logout(){
    return {
        type: 'logout'
    }
}



export default reducer;