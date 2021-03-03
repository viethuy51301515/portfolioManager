import {takeLatest, call, put, takeEvery} from 'redux-saga/effects';
import CONSTANT from './constants';
import {setUser,getSkill,getExperience,getAchivement,getPortfolio} from './api'
export default function *rootSaga() {
    yield takeLatest(CONSTANT.ACTION_CONSTANT.GET_INFOR,getUser)
}
function *getUser() {
    try {
        const user = yield call(setUser);
        const skill = yield call(getSkill);
        const experience = yield call(getExperience);
        const achivement = yield call(getAchivement);
        const portfolio = yield call(getPortfolio);
        yield put({type:CONSTANT.ACTION_CONSTANT.GET_USER,payload:{user,skill,experience,achivement,portfolio}});
    } catch (error) {
        yield put ({type:CONSTANT.ACTION_CONSTANT.ERROR,error})
    }
}
