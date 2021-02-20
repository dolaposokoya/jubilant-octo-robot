
import { API_URL } from './../url/apiUrl';
import axios from 'axios'

export const getSearchResult = async (token, searchform) => {
    return (axios.get(`${API_URL.getSearchResult}?bedrooms=${searchform.bedrooms}&development=${searchform.development}&max_price=${searchform.max_price}&min_price=${searchform.min_price}`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': `Bearer ` + token
            }
        })
    )

}
export const signin = async (email, password) => {
    return (axios.post(API_URL.loginUser + "?email=" + email + "&password=" + password, {
        email: email,
        password: password
    }, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    )
}

export const getDevelopmentDetails = async (token, devid) => {
    return (axios.get(API_URL.getDevelopmentDetails + "?id=" + devid, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': `Bearer ` + token
        }
    })

    )
}

export const getOneUser = async (token, id) => {
    return (axios.get(`${API_URL.getOneUser}?id=${id}`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': `Bearer ` + token
            }
        })
    )

}


export const getAllDevelopmentDetails = async (token) => {
    return (axios.get(API_URL.getAgentDevelopment, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': `Bearer ` + token
        }
    })

    )
}

export const getTokenForVerification = async (token) => {
    return (axios.get(`${API_URL.checkToken}=${token}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': `Bearer ` + token
        }
    })
    )
}

export const getDevelopmentUnitDetails = async (token, id, unitid) => {
    return (axios.get(`${API_URL.getDevelopmentUnitDetails}?unitid=${unitid}${id ? '&id=' + id : ''}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': `Bearer ` + token
        }
    })
    )
}

export const setHoldDevStatus = async (token, id, unitid, status) => {
    return (axios.put(`${API_URL.updateOneUnitStatusDevelopment}?unitid=${unitid}${id ? '&id=' + id : ''}&status=${status}`,
        {
            status: status,
            id: id,
            unitid: unitid
        }, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': `Bearer ` + token
        }
    })
    )
}
