import * as Actions from '../Actions/ActionNames'

export default function cardModalReducer(state = { cardId : "" }, action){
    switch(action.type){
        case Actions.SHOW_MODAL_POPUP:
            console.log("reduver", action.payload)
            return {cardId : action.payload.cardId};
        default:
            return state;
    }
}