import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
const combine = combineReducers({
    'login':loginReducer
})
export default combine;