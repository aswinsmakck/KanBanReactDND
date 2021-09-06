import * as Actions from './ActionNames'
import { nanoid } from 'nanoid'

export function AddList(boardId, listName, listId) {
    return { 
        type: Actions.LIST_ADDED, 
        payload: { 
            boardId,
            listName,
            listId
        } 
    };
}

export function AddListAndRef(boardId, listName) {
    let listId = nanoid();
    return (dispatch, getState) => {
        dispatch(AddList(boardId, listName, listId))
        dispatch(AddListRefInBoard(boardId, listName, listId))
    }
}

export function AddListRefInBoard(boardId, listName, listId) {
    return { 
        type: Actions.LIST_REF_ADDED, 
        payload: { 
            boardId,
            listName,
            listId
        } 
    };
}

export function EditListName(listId, editedListName) {
    return { 
        type: Actions.LIST_NAME_EDITED, 
        payload: { 
            listId,
            editedListName
        } 
    };
}

export function MoveList(dragListId, hoverListId, boardId, isAfter){
    console.log("****************************Move List ************************************", arguments);
    return {
        type : Actions.LIST_MOVED,
        payload: {
            hoverListId, dragListId, boardId, isAfter
        }
    }
}