import axios from "axios";

const GOT_CAMPUSES_FROM_SERVER = 'GOT_CAMPUSES_FROM_SERVER'
const ADDED_CAMPUS_TO_DATABASE = "ADDED_CAMPUS_TO_DATABASE"

const gotCampusesFromServer = (campuses) => {
    return { type: GOT_CAMPUSES_FROM_SERVER, campuses }
}

const addedCampusToDatabase = (campus) => {
    return { type: ADDED_CAMPUS_TO_DATABASE, campus }
}

export const getCampuses = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('/api/campuses')
            dispatch(gotCampusesFromServer(data))
        } catch (error) {
            console.error(error)
        }
    }
}

export const addCampus = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('/api/campuses/', body)
            dispatch(addedCampusToDatabase(data))
        } catch (error) {
            console.error(error)
        }
    }
}

export const deleteCampus = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`/api/campuses/${id}`)
        } catch (error) {
            console.error(error)
        }
    }
}

export const updateCampus = (id, body) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(`/api/campuses/${id}`, body)
        } catch (error) {
            console.error(error)
        }
    }
}

const campusesReducer = (campuses = [], action) => {
    switch (action.type) {
        case GOT_CAMPUSES_FROM_SERVER:
            return [...action.campuses]
        case ADDED_CAMPUS_TO_DATABASE:
            return [...campuses, action.campus]
        default:
            return campuses
    }
}

export default campusesReducer