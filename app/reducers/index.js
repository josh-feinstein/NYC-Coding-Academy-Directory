import { combineReducers } from 'redux'

import studentsReducer from './studentsReducer'
import campusesReducer from './campusesReducer'
import singleCampusReducer from './singleCampusReducer'
import singleStudentReducer from './singleStudentReducer'

const rootReducer = combineReducers({ students: studentsReducer, currentStudent: singleStudentReducer, campuses: campusesReducer, currentCampus: singleCampusReducer })

export default rootReducer