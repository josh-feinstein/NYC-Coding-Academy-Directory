import axios from "axios";

const GOT_SINGLE_CAMPUS_FROM_SERVER = 'GOT_SINGLE_CAMPUS_FROM_SERVER'

const gotSingleCampusFromServer = (singleCampus) => {
    return { type: GOT_SINGLE_CAMPUS_FROM_SERVER, singleCampus }
}

export const getSingleCampus = (campusId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/campuses/${campusId}`)
            dispatch(gotSingleCampusFromServer(data))
        } catch (error) {
            console.error(error)
        }
    }
}

const singleCampusReducer = (currentCampus = {}, action) => {
    switch (action.type) {
        case GOT_SINGLE_CAMPUS_FROM_SERVER:
            return { ...action.singleCampus }
        default:
            return currentCampus
    }
}

export default singleCampusReducer