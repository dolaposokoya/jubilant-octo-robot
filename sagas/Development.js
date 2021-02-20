/**
 * Todo Sagas
 */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

// api
import { getDevelopmentDetails, getAllDevelopmentDetails, getDevelopmentUnitDetails, setHoldDevStatus, getSearchResult } from './../api';

import {
    GET_DEVELOPMENT,
    LOGOUT_USER,
    UNAUTHORIZATION_ACCESS,
    GET_ALL_DEVELOPMENT,
    GET_DEVELOPMENT_UNIT,
    SET_STATUS,
    AVAILABLE_SEARCH_UNIT
} from './../actions/types';
import { API_URL } from '../url/apiUrl';
import {
    getDevelopmentSuccess,
    getDevlopmentFailure,
    getAllDevelopmentSuccess,
    getAllDevlopmentFailure,
    logoutUserFromFirebaseSuccess,
    logoutUserFromFirebaseFailure,
    getDevelopmentUnitSuccess,
    getDevelopmentUnitFailure,
    getSearchFailure,
    setHoldStatusSuccess,
    setHoldStatusFailure,
    getAvailableSearchSuccess,
    getAvailableSearchFailure
} from './../actions';


const special = ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
const deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];


/**
 * Send Todos Request To Server
 */
const getDevelopmentRequest = async (token, developmentid) =>
    await getDevelopmentDetails(token, developmentid)
        .then(response => response)
        .catch(error => error);

/**
 * Send Todos Request To Server
 */
const getDevelopmentUnitRequest = async (token, id, unitid) =>
    await getDevelopmentUnitDetails(token, id, unitid)
        .then(response => response)
        .catch(error => error);


        /**
 * Send Todos Request To Server
 */
const getSearchRequest = async (token, searchForm) =>
await getSearchResult(token, searchForm)
    .then(response => response)
    .catch(error => error);

/**
 * Send Todos Request To Server
 */
const getAllDevelopmentRequest = async (token, id, unitid) =>
    await getAllDevelopmentDetails(token, id, unitid)
        .then(response => response)
        .catch(error => error);

/**
 * Send Todos Request To Server
 */
const setStatusUnit = async (token, id, unitid, status) =>
    await setHoldDevStatus(token, id, unitid, status)
        .then(response => response)
        .catch(error => error);


/**
 * Get Todos From Server 
 */
function* getDevelopmentDetailFromServer({ payload }) {
    const { token, developmentid, redirectUrl, history } = payload;
    try {
        const response = yield call(getDevelopmentRequest, token, developmentid);
        if (response.data.success) {
            let data = []
            let res = response.data.data;
            console.log("res", res)
            yield put(getDevelopmentSuccess(res));
            if (history) history.push(redirectUrl)
        }
        else if (response.data.type == UNAUTHORIZATION_ACCESS) {
            yield put(getDevlopmentFailure(response.data.message));
        }
        else {
            yield put(getDevlopmentFailure(response.data.message));
        }
    } catch (error) {
        yield put(getDevlopmentFailure(error));
    }
}

/**
 * Get Todos From Server 
 */
function* getDevelopmentAllDetailFromServer({ payload }) {
    const { token } = payload;
    try {
        const response = yield call(getAllDevelopmentRequest, token);
        if (response.data.success) {
            let res = response.data.data;

            yield put(getAllDevelopmentSuccess(res));

        }
        else if (response.data.type == UNAUTHORIZATION_ACCESS) {
            yield put(getAllDevlopmentFailure(response.data.message));
        }
        else {
            yield put(getAllDevlopmentFailure(response.data.message));
        }
    } catch (error) {
        yield put(getAllDevlopmentFailure(error));
    }
}

function* getDevelopmentUnitFromServer({ payload }) {
    const { id, unitid, token, redirectUrl, history } = payload;
    try {
        const response = yield call(getDevelopmentUnitRequest, token, id, unitid);
        if (response.data.success) {
            let res = response.data.data;
            let units = res.unitDetail[0]

            let beds = units.bedrooms ? units.bedrooms + ' Beds' : 'Not defined';
            let discount = 0;
            discount = res.costReturn ? parseInt(res.costReturn.discount) : 0

            let bedsCount = []
            for (let i = 1; i <= units.bedrooms; i++) {
                bedsCount.push(i)
            }
            let decafloor = ''

            let floornumber = units.floor ? !isNaN(units.floor.value) ? parseInt(units.floor.value) : units.floor.value : 'Not Available'
            if (floornumber === 'groundfloor' || isNaN(floornumber)) {
                decafloor = floornumber === 'groundfloor' ? 'Ground' : 'Not Defined ';
            }
            else
                if (floornumber < 20) { decafloor = special[floornumber]; }
                else if (floornumber % 10 === 0) { decafloor = deca[Math.floor(floornumber / 10) - 2] + 'ieth'; }
                else { decafloor = deca[Math.floor(floornumber / 10) - 2] + 'y-' + special[floornumber % 10]; }

            let image = process.env.PUBLIC_URL + '/' + 'assets/img/development/9.png';
            if (units.assets && !units.assets.image) {
                if (res.genericAppartment && units.property_type) {
                    let tempimage = res.genericAppartment.find(ele => ele.appartmentType.value === units.property_type.value && units.bedrooms && ele.number_of_bedrooms === units.bedrooms)
                    if (tempimage) image = API_URL.BucketURl + tempimage.thumbnail.filename
                }
            }
            else if (units.assets && units.assets.image) {
                image = API_URL.BucketURl + units.assets.image
            }
            let searchItem = {
                "title": res.details.name,
                "unit_number": units.unit_number,
                "id": res._id,
                "unit_id": units._id,
                "floor": decafloor,
                "discount": units.cost_and_returns ? parseInt((discount / 100) * units.cost_and_returns.sales_price) : 0,
                "sales_price": units.cost_and_returns && units.cost_and_returns.sales_price,
                "investor_price": units.cost_and_returns && units.cost_and_returns.investor_price,
                "image": image,
                "planning_consent":res.details.planningConsent,
                "completion_date":res.details.completionDate,
                "onSiteParking":res.details.onSiteParking,
                "unit_count":res.details.unitNumber,
                "assured_return": res.costReturn.assuredReturn,
                "area": units.floor_area_ft2,
                "type": units.property_type ? units.property_type.label : 'Apartment',
                "status": units.status,
                "features": [
                    {
                        "icon": "fa fa-bed",
                        "title": beds
                    }
                ],
                "bedrooms": bedsCount,
                "parking": false
            }
            console.log("searchItem", searchItem)
            yield put(getDevelopmentUnitSuccess(searchItem, res));
            yield put(getSearchFailure())
            if (history) history.push(redirectUrl)
        }
        else if (response.data.type == UNAUTHORIZATION_ACCESS) {

        }
        else {
            yield put(getDevelopmentUnitFailure(response.data.message));
        }
    } catch (error) {
        console.log("error", error)
        yield put(getDevelopmentUnitFailure(error));
    }
}

/**
 * Get Todos From Server 
 */



/**
 * Signout User
 */
function* signOut() {
    try {
        localStorage.removeItem('user_id');
        localStorage.removeItem('tokenweb');
        localStorage.removeItem('userid');
        yield put(logoutUserFromFirebaseSuccess())
    } catch (error) {
        yield put(logoutUserFromFirebaseFailure());
    }
}

/**
 * Get Todos From Server 
 */
function* setStatusUnitFromServer({ payload }) {
    const { token, developmentid, unitid, status } = payload;
    try {
        console.log("payload", payload)
        const response = yield call(setStatusUnit, token, developmentid, unitid, status);
        if (response.data.success) {
            let res = response.data.data;

            yield put(setHoldStatusSuccess(res));

        }
        else if (response.data.type == UNAUTHORIZATION_ACCESS) {
            yield put(setHoldStatusFailure(response.data.message));
        }
        else {
            yield put(setHoldStatusFailure(response.data.message));
        }
    } catch (error) {
        yield put(setHoldStatusFailure(error));
    }
}

/**
 * Get Todos From Server 
 */
function* getAvailableSearchFromServer({ payload }) {
    const { searchForm, token } = payload;
    try {
        const response = yield call(getSearchRequest, token, searchForm);
        if (response.data.success) {
            let data = []
            let resArray = response.data.data;
            resArray.map(res => {
                let discount = 0;
                discount = res.development && res.development.costReturn ? parseInt(res.development.costReturn.discount) : 0
                res.units.map(units => {

                    let beds = units.bedrooms ? units.bedrooms + ' Beds' : 'Not defined'
                    let bedsCount = []
                    for (let i = 1; i <= units.bedrooms; i++) {
                        bedsCount.push(i)
                    }
                    let decafloor = ''

                    let floornumber = units.floor?!isNaN(units.floor.value) ? parseInt(units.floor.value) : units.floor.value: 'Not Available'
                    if (floornumber === 'groundfloor' || isNaN(floornumber)) {
                        decafloor = floornumber === 'groundfloor'?'Ground': 'Not Defined ';
                    }
                    else
                        if (floornumber < 20) { decafloor = special[floornumber]; }
                        else if (floornumber % 10 === 0) { decafloor = deca[Math.floor(floornumber / 10) - 2] + 'ieth'; }
                        else { decafloor = deca[Math.floor(floornumber / 10) - 2] + 'y-' + special[floornumber % 10]; }

                    let image = process.env.PUBLIC_URL + '/' + 'assets/img/development/9.png';
                    if (!units.assets || !units.assets.image) {
                        if (res.development && res.development.genericAppartment && units.property_type) {
                            let tempimage = res.development.genericAppartment.find(ele => ele.appartmentType.value === units.property_type.value && units.bedrooms && ele.number_of_bedrooms === units.bedrooms)
                            if (tempimage) image = API_URL.BucketURl + tempimage.thumbnail.filename
                        }
                    }
                    else if (units.assets && units.assets.image) {
                        image = API_URL.BucketURl + units.assets.image
                    }
                    let searchItem = {
                        "title": res.development.details.name,
                        "unit_number": units.unit_number,
                        "id": res.development._id,
                        "unit_id": units._id,
                        "floor": decafloor,
                        "sales_price": units.cost_and_returns ? units.cost_and_returns.sales_price : 'not defined',
                        "discount": units.cost_and_returns ? parseInt((discount / 100) * units.cost_and_returns.sales_price) : 0,
                        "investor_price": units.cost_and_returns ? units.cost_and_returns.investor_price : 0,
                        "reservation": units.cost_and_returns ? units.cost_and_returns.reservation : 0,
                        "exchange": units.cost_and_returns ? units.cost_and_returns.exchange : 0,
                        "completion": units.cost_and_returns ? units.cost_and_returns.completion : 0,
                        "image": image,
                        "url": "/development-details?unit=" + units._id,
                        "area": units.floor_area_ft2,
                        "status": units.status?units.status:'available',
                        
                        "type": units.property_type ? units.property_type.label : 'Not defined',
                        "features": [
                            {
                                "icon": "fa fa-bed",
                                "title": beds
                            }
                        ],
                        "bedrooms": bedsCount,
                        "parking": false
                    }

                    data.push(searchItem)

                })

            })
            console.log("data", data)
            yield put(getAvailableSearchSuccess(data));
        }
        else {
            yield put(getAvailableSearchFailure(response.data.message));
        }
    } catch (error) {
        console.log("error", error)
        yield put(getSearchFailure(error));
    }
}

/**
 * Get development
 */
export function* getDevelopment() {
    yield takeEvery(GET_DEVELOPMENT, getDevelopmentDetailFromServer);
}

/**
 * Get All development
 */
export function* getAllDevelopment() {
    yield takeEvery(GET_ALL_DEVELOPMENT, getDevelopmentAllDetailFromServer);
}

/**
 * Signout User From Firebase
 */
export function* signOutUser() {
    yield takeEvery(LOGOUT_USER, signOut);
}

/**
 * Signout User From Firebase
 */
export function* getDevelopmentUnit() {
    yield takeEvery(GET_DEVELOPMENT_UNIT, getDevelopmentUnitFromServer);
}

/**
 * Signout User From Firebase
 */
export function* setHoldStatus() {
    yield takeEvery(SET_STATUS, setStatusUnitFromServer);
}


/**
 * Ger Emails
 */
export function* getAvailableSearch() {
    yield takeEvery(AVAILABLE_SEARCH_UNIT, getAvailableSearchFromServer);
}
/**
 * Email Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(getDevelopment),
        fork(getAllDevelopment),
        fork(signOutUser),
        fork(getDevelopmentUnit),
        fork(setHoldStatus),
        fork(getAvailableSearch)
    ]);
}