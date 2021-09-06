import {combineReducers} from 'redux'
import boardReducer from './boardReducer'
import listReducer from './listReducer'
import cardReducer from './cardReducer'
import cardModalReducer from './cardModalReducer'

export default combineReducers({
    boards : boardReducer,
    lists : listReducer,
    cards : cardReducer,
});