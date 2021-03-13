const initialState = {
    username: '',
    profilePic: ''
}

const updateUser = 'updateUser';
const logout = 'logout';

export function reducer (state = initialState, action){
    let { type, payload } = action;
    switch (type){
        case updateUser:
            return{...state, username: payload.username, profilePic: payload.profilePic};
        case logout:
            return initialState;
        default:
            return state;
    }
}

export function logout(){
    return {
        type: logout
    }
}
// will come back and finish when I have