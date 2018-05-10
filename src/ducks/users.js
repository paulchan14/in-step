import axios from 'axios';

const initialState = {
    user: {}, 
    user_preferences: {
        user_genres: [],
        user_pace: ''
    },
    favorite_tracks: [],
    current_index: 0,
    indexMatrix: {},
    playlists: []
}

const FULFILLED = '_FULFILLED';

const GET_USER = 'GET_USER'
    , GET_PREFERENCES = 'GET_PREFERENCES'
    , POST_PREFERENCES = 'POST_PREFERENCES'
    , GET_PLAYLISTS = 'GET_PLAYLISTS'
    , GET_MATRIX = 'GET_MATRIX'
    , CHANGE_INDEX = 'CHANGE_INDEX'
    , LOGOUT = 'LOGOUT';

// export function get_user() {
//     let userData = axios.get('/api/auth/me').then( res => {
//         return res.data
//     })

//     return {
//         type: GET_USER,
//         payload: userData
//     }
// }

// TEST
export function get_user(user) {
    return {
        type: GET_USER,
        payload: user
    }
}

export function get_playlists(userid) {
    // let indexMatrix = {};

    let playlistData = axios.get(`/api/playlists/${userid}`).then( res => {
        console.log('Get playlists: ', res.data)
        // res.data.forEach( playlist => {
        //     const { playlist_id, playlist_index } = playlist 
        //     indexMatrix[playlist_index] = playlist_id
        // })
        // console.log('Index matrix: ', indexMatrix)

        return res.data
    })
    
    return {
        type: GET_PLAYLISTS,
        payload: playlistData
    }
}

export function get_matrix(matrix) {
    console.log('Action creator: ', matrix)
    return {
        type: GET_MATRIX,
        payload: matrix
    }
}

export function get_preferences(userid) {
    let preferences = axios.get(`/api/user_preferences?userid=${userid}`).then( res => {
        // console.log('User preferences: ', res.data)
        return res.data
    })
    
    return {
        type: GET_PREFERENCES,
        payload: preferences
    }
}

export function post_user_preferences(userid, userGenrePrefs, user_pace) {
    let user_preferences = axios.post(`/api/user_preferences?userid=${userid}`, {userGenrePrefs, user_pace}).then( res => {
        // console.log('Preferences after saving to DB: ', res.data)
        return res.data;
    }).catch(err => console.log('Something went wrong: ', err))
    // setTimeout( () => console.log('Preferences: ', preferences), 5000)

    return {
        type: POST_PREFERENCES,
        payload: user_preferences
    }
}

export function changeIndex(index) {
    return {
        type: CHANGE_INDEX,
        payload: index
    }
}

export function logout() {
    return {
        type: LOGOUT,
        payload: {}
    }
}


export default function users(state = initialState, action) {
    
    switch( action.type ) {
        // case GET_USER + PENDING:
        //     console.log('pending');
        //     break;
        
        // case GET_USER + REJECTED:
        //     console.log('rejected');
        //     break;
            
        // case GET_USER + FULFILLED:
        //     return Object.assign({}, state, {user: action.payload});

        case GET_USER:
            return Object.assign({}, state, {user: action.payload});

        case GET_PLAYLISTS + FULFILLED:
            let matrix = {};
            action.payload.forEach( playlist => {
                const { playlist_id, playlist_index } = playlist 
                matrix[playlist_index] = playlist_id
            })

            console.log('Playlists saved to Redux: ', action.payload)
            console.log('Index Matrix: ', matrix)
            return Object.assign({}, state, { playlists: action.payload, indexMatrix: matrix })

        case GET_PREFERENCES + FULFILLED:
            console.log('Preferences saved to Redux: ', action.payload)
            return Object.assign({}, state, { user_preferences: action.payload })

        case POST_PREFERENCES + FULFILLED:
            console.log('Post preferences fulfilled: ', action.payload)
            return Object.assign({}, state, {user_preferences: action.payload});

        // case GET_MATRIX:
        //     console.log('Matrix saved to Redux: ', action.payload)
        //     return Object.assign({}, state, { indexMatrix: action.payload })
        
        case CHANGE_INDEX:
            return Object.assign({}, state, { current_index: action.payload })
        
        case LOGOUT: 
            return Object.assign({}, state, {})
        
        default:
            return state;
    }
}