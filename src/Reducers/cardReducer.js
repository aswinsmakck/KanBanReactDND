import _ from 'lodash';
import * as Actions from '../Actions/ActionNames'
import {nanoid} from 'nanoid'

const addCard = (cards, payload) => {

    let id = payload.cardId;

    let newCard = {
        id,
        title : payload.cardName
    }
    console.log("card reducer", { byId : {...cards.byId, [id] : newCard } })
    return { byId : {...cards.byId, [id] : newCard }  };
}

const removeCard = (cards, payload) => {
    
    let cardId = payload.cardId;
    console.log(cardId)
    delete cards.byId[cardId];
    //cards.allIds = cards.allIds.filter((_cardId) => _cardId !== cardId)
    console.log("card reducer", cards)
    return cards;
}

const editCardTitle = (cards, payload) => {
    console.log("card reducer",payload);
    let cardId = payload.cardId;
    let editedCardTitle = payload.editedCardTitle;

    if(editedCardTitle.trim() === "") return cards;
    cards.byId[cardId].title = editedCardTitle;

    console.log(cards)

    return cards;
}

const editCardDescription = (cards, payload) => {

    let cardId = payload.cardId;
    let editedCardDescription = payload.editedCardDescription;

    cards.byId[cardId].desc = editedCardDescription;

    return cards;
}

export default function cardReducer(originalState={ byId : {} }, action){
    let state = _.cloneDeep(originalState);
    switch(action.type){

        case Actions.CARD_ADDED :
            return addCard(state, action.payload);

        case Actions.CARD_REMOVED :
            return removeCard(state, action.payload);

        case Actions.CARD_TITLE_EDITED :
            return editCardTitle(state, action.payload);

        case Actions.CARD_DESC_EDITED :
            return editCardDescription(state, action.payload);

        default:
            return state;
    }
}