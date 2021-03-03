import CONSTANT from '../constants';
const getInforReducer = (state = [],action)=>{
    switch (action.type) {
        case CONSTANT.ACTION_CONSTANT.GET_USER:
            return state = action.payload;
        default:
            return state;
    }
}
export default getInforReducer;