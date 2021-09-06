import * as Actions from './ActionNames'

export function AddBoard(boardName){
    return {type: Actions.BOARD_ADDED , payload : {boardName}}
}