/**
 * Todo Sagas
 */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

// api
import { getSearchResult } from './../api';

import {
    SEARCH_UNIT,
    AVAILABLE_SEARCH_UNIT
} from './../actions/types';

import {
    getSearchFailure,
    getAvailableSearchFailure,
    getAvailableSearchSuccess,
    getSearchSuccess
} from './../actions';
import { API_URL } from '../url/apiUrl';

const special = ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
const deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

        /**
 * Send Todos Request To Server
 */
const getSearchRequest = async (token, searchForm) =>
await getSearchResult(token, searchForm)
    .then(response => response)
    .catch(error => error);


/**
 * Get Todos From Server 
 */
function* getSearchFromServer({ payload }) {
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
                        "status": units.status,
                        
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
            yield put(getSearchSuccess(data));
        }
        else {
            yield put(getSearchFailure(response.data.message));
        }
    } catch (error) {
        console.log("error", error)
        yield put(getSearchFailure(error));
    }
}



/**
 * Ger Emails
 */
export function* getSearch() {
    yield takeEvery(SEARCH_UNIT, getSearchFromServer);
}

/**
 * Email Root Saga
 */
export default function* rootSaga() {
    yield all([
        fork(getSearch)
    ]);
}