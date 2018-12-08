import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCampuses } from '../reducers/campusesReducer'
import { addStudent } from '../reducers/studentsReducer'
import { Link } from 'react-router-dom'

class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            campusId: '',
            gpa: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateFirstName = this.updateFirstName.bind(this)
        this.updateLastName = this.updateLastName.bind(this)
        this.updateEmail = this.updateEmail.bind(this)
        this.updateGPA = this.updateGPA.bind(this)
        this.updateCampusId = this.updateCampusId.bind(this)
    }

    componentDidMount() {
        this.props.getCampuses()
    }

    handleSubmit(event) {
        event.preventDefault()
        const objectForDatabase = { ...this.state }

        if (objectForDatabase.firstName === "" ||
            objectForDatabase.lastName === "" ||
            objectForDatabase.email === "") {
            alert(`Make sure you don't leave any fields blank.`)
            return
        }

        if (objectForDatabase.gpa === "") {
            objectForDatabase.gpa = '0.0'
        }

        objectForDatabase.gpa = Number.parseFloat(objectForDatabase.gpa)
        if (objectForDatabase.campusId === "") {
            objectForDatabase.campusId = null
        }
        this.props.addStudent(objectForDatabase)
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            campusId: '',
            gpa: null
        })
        this.props.history.goBack()
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

    render() {
        if (this.props.campuses === undefined) {
            return (<div>LOADING</div>)
        }

        return (
            <div>
                <h1>Add New Student:</h1>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <input onChange={this.updateFirstName} name="firstName" value={this.state.firstName} type="text" placeholder="First Name" />
                                </td>
                                <td>
                                    <input onChange={this.updateLastName} name="lastName" value={this.state.lastName} type="text" placeholder="Last Name" />
                                </td>
                                <td>
                                    <input onChange={this.updateEmail} name="email" type="text" value={this.state.email} placeholder="E-mail Address" />
                                </td>
                            </tr>
                            <tr>
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
                                <td>
                                    <input onChange={this.updateGPA} name="gpa" type="text" value={this.state.gpa} placeholder="GPA" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Link to="/students"><button onClick={this.handleSubmit} type="submit">Submit</button></Link>
                                </td>
                                <td>
                                    <Link to="/students"><button>Go Back</button></Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div >
        )
    }
}

const mapState = (state) => { return ({ campuses: state.campuses }) }
const mapDispatch = (dispatch) => {
    return {
        getCampuses: () => dispatch(getCampuses()),
        addStudent: (body) => dispatch(addStudent(body))
    }
}

export default connect(mapState, mapDispatch)(AddStudent);