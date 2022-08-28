import isEmpty from 'lodash/isEmpty';
//inicialisamos el estado inicial
const initialState = {
    artObjects: [],
    userDetail: {},
    user: {},
}
function reducer(state = initialState, action){
    switch (action.type) {
        case "GET_ART_OBJECTS":
            return{
                ...state,
                artObjects: action.payload
            }
        case "SEARCH_ART_OBJECTS":
            return{
                //hacemos una copia del estado para no perder info
                ...state,
                //agregamos la info 
                artObjects: action.payload
            }
        case "GET_MY_ART_OBJECTS":
            return {
                ...state,
                artObjects: action.payload
            }
        case "GET_USER":
            return {
                ...state,
                userDetail: action.payload
            }
        case 'LOGIN_CLIENT':
            return {
                ...state,
            };
        default:
           return {...state}
    }
}
export default reducer