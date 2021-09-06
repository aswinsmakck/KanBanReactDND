import * as Actions from './ActionNames'

export function showCardModalPopupAction(cardId){
    return ({
        type : Actions.SHOW_MODAL_POPUP,
        payload : {
            cardId
        }
    })
}