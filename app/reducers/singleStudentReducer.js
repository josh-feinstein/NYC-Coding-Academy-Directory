import axios from "axios";

const GOT_SINGLE_STUDENT_FROM_SERVER = 'GOT_SINGLE_STUDENT_FROM_SERVER'

const gotSingleStudentFromServer = (singleStudent) => {
    return { type: GOT_SINGLE_STUDENT_FROM_SERVER, singleStudent }
}

export const getSingleStudent = (studentId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/students/${studentId}`)
            dispatch(gotSingleStudentFromServer(data))
        } catch (error) {
            console.error(error)
        }
    }
}

const singleStudentReducer = (currentStudent = {}, action) => {
    switch (action.type) {
        case GOT_SINGLE_STUDENT_FROM_SERVER:
            return { ...action.singleStudent }
        default:
            return currentStudent
    }
}

export default singleStudentReducer