import {combineReducers} from 'redux';
import getInforReducer from '../reducers/infor'
const allReducer = combineReducers({
    getInforReducer:getInforReducer
})
export default allReducer;