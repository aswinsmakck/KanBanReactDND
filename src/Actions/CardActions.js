import * as Actions from './ActionNames'
import { nanoid } from 'nanoid'

export function AddCard(listId, cardName, cardId){
    return {
        type : Actions.CARD_ADDED,
        payload : {
            listId, 
            cardName,
            cardId  
        }
    }
}

export function AddCardAndRef(listId, cardName) {
    let cardId = nanoid();
    return (dispatch, getState) => {
        dispatch(AddCard(listId, cardName, cardId))
        dispatch(AddCardRefInList(listId, cardName, cardId))
    }
}

export function AddCardRefInList(listId, cardName, cardId) {
    return { 
        type: Actions.CARD_REF_ADDED, 
        payload: { 
            listId,
            cardName,
            cardId
        } 
    };
}

export function MoveCard(hoverCardId, dragCardId, listId, isDownwards){
    return {
        type : Actions.CARD_MOVED,
        payload : {
            hoverCardId, 
            dragCardId,
            listId,
            isDownwards
        }
    }
}

export function EditCardTitle(cardId, editedCardTitle){
    return {
        type : Actions.CARD_TITLE_EDITED,
        payload : { 
            cardId, 
            editedCardTitle
        }
    }
}

export function EditCardDescription(cardId, editedCardDescription){
    return {
        type : Actions.CARD_DESC_EDITED,
        payload : {
            cardId, 
            editedCardDescription
        }
    }
}

export function RemoveCard(cardId, listId){
    return (dispatch, getState)=> {
        dispatch({
            type : Actions.CARD_REMOVED,
            payload : { 
                cardId
            }
        })

        dispatch({
            type : Actions.CARD_REF_REMOVED,
            payload : { 
                cardId,
                listId
            }
        })
    }
}

export function MoveCardToList(cardId, curListId,droppedListId, hoverIndex){
    return {
        type : Actions.Card_Moved_To_List,
        payload : {
            cardId,
            curListId,
            droppedListId,
            hoverIndex
        }
    }
}