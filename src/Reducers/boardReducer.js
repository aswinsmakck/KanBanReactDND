import * as Actions from '../Actions/ActionNames'
import {nanoid} from 'nanoid'
import _ from 'lodash';

const addListRefInBoard = (state, payload) => {
    let board = state.byId[payload.boardId]
    if(!board) return state;
    if( !('lists' in board )){
        board.lists = [];
    }
    board.lists = [...board.lists, payload.listId]
    console.log("----------------------ref added to board---------------------",state);
    console.log("----------------------ref added to board---------------------",board);
    state.byId[payload.boardId] = board;
    console.log("----------------------ref added to board---------------------",state);
    return state;
}

const moveList = (boards, payload) =>{
    console.log(payload);
    let board = boards.byId[payload.boardId]

    let offset = payload.isAfter ? 1 : 0;

    board.lists = board.lists.filter(_listId => _listId !== payload.dragListId);
    board.lists.splice( board.lists.indexOf(payload.hoverListId) + offset, 0 , payload.dragListId)
    boards.byId[payload.boardId] = board
    return boards;
} 

export default function boardReducer(originalState = { byId : {}, allIds : [] } , action){

    let state = _.cloneDeep(originalState);
    
    switch(action.type){

        case Actions.BOARD_ADDED :

            let id = nanoid();
            return (
                {
                        byId :{
                            ...state.byId,
                            [id] : {
                                id,
                                name : action.payload.boardName,
                                lists : []
                            }
                        },
                        allIds : [...state.allIds, id]
                }
                
            );

        case Actions.LIST_REF_ADDED :
            return addListRefInBoard(state, action.payload)

        case Actions.LIST_MOVED :
            return moveList(state, action.payload);

        default :
            return state;
    }
}