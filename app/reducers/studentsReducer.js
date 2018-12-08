import axios from "axios";

const GOT_STUDENTS_FROM_SERVER = 'GOT_STUDENTS_FROM_SERVER'
const ADDED_STUDENT_TO_DATABASE = "ADDED_STUDENT_TO_DATABASE"

const gotStudentsFromServer = (students) => {
    return { type: GOT_STUDENTS_FROM_SERVER, students }
}

const addedStudentToDatabase = (student) => {
    return { type: ADDED_STUDENT_TO_DATABASE, student }
}

export const getStudents = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('/api/students')
            dispatch(gotStudentsFromServer(data))
        } catch (error) {
            console.error(error)
        }
    }
}

export const addStudent = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('/api/students/', body)
            dispatch(addedStudentToDatabase(data))
        } catch (error) {
            console.error(error)
        }
    }
}

export const deleteStudent = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`/api/students/${id}`)
        } catch (error) {
            console.error(error)
        }
    }
}

export const updateStudent = (id, body) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(`/api/students/${id}`, body)
        } catch (error) {
            console.error(error)
        }
    }
}

const studentsReducer = (students = [], action) => {
    switch (action.type) {
        case GOT_STUDENTS_FROM_SERVER:
            return [...action.students]
        case ADDED_STUDENT_TO_DATABASE:
            return [...students, action.student]
        default:
            return students
    }
}

export default studentsReducer