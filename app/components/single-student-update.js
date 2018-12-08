import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCampuses } from '../reducers/campusesReducer'
import { getSingleStudent } from '../reducers/singleStudentReducer'
import { updateStudent } from '../reducers/studentsReducer'
import { Link } from 'react-router-dom'

class SingleStudentUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.updateFirstName = this.updateFirstName.bind(this)
        this.updateLastName = this.updateLastName.bind(this)
        this.updateEmail = this.updateEmail.bind(this)
        this.updateGPA = this.updateGPA.bind(this)
        this.updateCampusId = this.updateCampusId.bind(this)
        this.updateStudent = this.updateStudent.bind(this)
        this.goBackWithRender = this.goBackWithRender.bind(this)
    }

    componentDidMount() {
        this.props.getCampuses()
        this.props.getSingleStudent()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState == this.state) {
            this.setState({ ...this.props.currentStudent })
        }
    }

    updateStudent(event, body) {
        const objectForDatabase = { ...this.state }
        if (objectForDatabase.firstName === "" ||
            objectForDatabase.lastName === "" ||
            objectForDatabase.email === "" ||
            objectForDatabase.gpa === "") {
            alert(`Make sure you don't leave any fields blank.`)
            return
        }

        if (objectForDatabase.campusId === "") {
            objectForDatabase.campusId = null
        }
        const updatedStudent = this.props.updateStudent(this.state.id, objectForDatabase)
        this.setState({ ...updatedStudent })
        this.props.updateStudentToggle()
    }

    updateFirstName(event) {
        this.setState({ firstName: event.target.value })
    }

    updateLastName(event) {
        this.setState({ lastName: event.target.value })
    }

    updateEmail(event) {
        this.setState({ email: event.target.value })
    }

    updateGPA(event) {
        this.setState({ gpa: event.target.value })
    }

    updateCampusId(event) {
        this.setState({ campusId: event.target.value })
    }

    goBackWithRender() {
        this.props.updateStudentToggle()
    }

    render() {
        if (this.props.currentStudent.firstName === undefined) {
            return (
                <div>
                    Hmmm... We can't seem to find the student you're looking for.<br />
                    Please click <Link to="/students">here</Link> to go back to the All Students page.
                </div>
            )
        }

        return (
            <div className="singleStudent" align="center">
                <h1>Student</h1>
                <table>
                    <tbody>

                    </tbody>
                </table>
                <form>
                    <table width="400px">
                        <tbody>
                            <tr>
                                <td>
                                    <img width="100px" src={this.props.currentStudent.imageUrl} />
                                </td>
                                <td>

                                    <input className="first-and-last-name-inputs" onChange={this.updateFirstName} value={this.state.firstName} />
                                    <input className="first-and-last-name-inputs" onChange={this.updateLastName} value={this.state.lastName} />

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Email:
                            </td>
                                <td>
                                    <input onChange={this.updateEmail} value={this.state.email} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Current GPA:
                            </td>
                                <td>
                                    <input onChange={this.updateGPA} value={this.state.gpa} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Campus:
                                </td>
                                <td>
                                    <select onChange={this.updateCampusId} name="campusId" value={this.state.campusId}>
                                        <option value="">--Select Campus--</option>
                                        {this.props.campuses.map(campus => {
                                            return (
                                                <option key={campus.id} value={campus.id}>{campus.name}</option>
                                            )
                                        })}
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={this.updateStudent} type="submit">Update Student Record</button>
                    <button onClick={this.goBackWithRender}>Go Back</button>
                </form>
            </div >
        )
    }
}

const mapState = (state) => { return { currentStudent: state.currentStudent, campuses: state.campuses } }
const mapDispatch = (dispatch) => {
    return {
        getCampuses: () => dispatch(getCampuses()),
        getSingleStudent: () => dispatch(getSingleStudent()),
        updateStudent: (id, body) => dispatch(updateStudent(id, body))
    }
}
export default connect(mapState, mapDispatch)(SingleStudentUpdate)