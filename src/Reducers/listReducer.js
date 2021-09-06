import _ from 'lodash';
import * as Actions from '../Actions/ActionNames'

const addList = (lists, payload) => {
        let id = payload.listId;
    let newList = {
        id ,
        name : payload.listName,
        cards : []   
    }
    console.log("list reducer", newList)
    return { byId : {...lists.byId, [id] : newList } };
}

const editListName = (lists, payload) => {
    
    let editedListName = payload.editedListName;
    let listId = payload.listId;
    if(editedListName.trim() === "") return lists;
    lists.byId[listId].name = editedListName;

    return lists;
        
}

const addCardAndRef = (lists, payload) => {
    let list = lists.byId[payload.listId]
    if(!list) return lists;
    if( !('cards' in list )){
        list.cards = [];
    }
    list.cards = [...list.cards, payload.cardId]
    lists.byId[payload.listId] = list;
    console.log("**********************************card ref in list*******************************", lists);
    return lists;
}


const moveCard = (lists, payload) =>{
    console.log(payload);
    let list = lists.byId[payload.listId]

    let offset = payload.isDownwards ? 1 : 0;

    list.cards = list.cards.filter(_cardId => _cardId !== payload.dragCardId);
    list.cards.splice( list.cards.indexOf(payload.hoverCardId) + offset, 0 , payload.dragCardId)
    lists.byId[payload.listId] = list
    return lists;
} 

const moveCardToList = (lists, payload) => {
console.log("***************************************************************************************************");
    let curSiblings = lists.byId[payload.curListId].cards;
    let filteredCards = curSiblings.filter(cardId => cardId !== payload.cardId)
    lists.byId[payload.curListId].cards = filteredCards;

    let droppedSiblings = lists.byId[payload.droppedListId].cards;
    droppedSiblings.splice( droppedSiblings.indexOf(payload.hoverCardId), 0 , payload.cardId)

    lists.byId[payload.droppedListId].cards = droppedSiblings;


    //cards.byId[payload.cardId].listId = payload.droppedListId;
    return lists;
}

const removeCardRef = (lists, payload) =>{

    let list = lists.byId[payload.listId]

    let filteredCards = list.cards.filter(cardId => cardId !== payload.cardId);

    lists.byId[payload.listId].cards = filteredCards;

    return lists;
}


export default function listReducer(originalState={ byId : {} }, action){

    console.log("before add list", originalState);
    let state = _.cloneDeep(originalState);

    switch(action.type){

        case Actions.LIST_ADDED :
            console.log("before add list", state);
            console.log("before add list", originalState);
            return addList(state, action.payload);
        
        case Actions.LIST_NAME_EDITED :
            return editListName(state, action.payload);
        
        case Actions.CARD_REF_ADDED :
            return addCardAndRef(state, action.payload)

        case Actions.CARD_MOVED :
            return moveCard(state, action.payload);

        case Actions.Card_Moved_To_List :
            return moveCardToList(state, action.payload);

        case Actions.CARD_REF_REMOVED :
            return removeCardRef(state, action.payload);

        default :
            return state;
    }
}