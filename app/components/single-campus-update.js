import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getStudents } from '../reducers/studentsReducer'
import { getSingleCampus } from '../reducers/singleCampusReducer'
import { updateCampus } from '../reducers/campusesReducer'
import { Link } from 'react-router-dom'

class SingleCampusUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.updateCampus = this.updateCampus.bind(this)
        this.updateName = this.updateName.bind(this)
        this.updateAddress = this.updateAddress.bind(this)
        this.updateDescription = this.updateDescription.bind(this)
        this.goBackWithRender = this.goBackWithRender.bind(this)
    }

    componentDidMount() {
        this.props.getStudents()
        this.props.getSingleCampus()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState == this.state) {
            this.setState({ ...this.props.currentCampus })
        }
    }

    updateCampus(event, body) {
        const objectForDatabase = { ...this.state }
        if (objectForDatabase.name === "" ||
            objectForDatabase.address === "" ||
            objectForDatabase.description === "") {
            alert(`Make sure you don't leave any fields blank.`)
            return
        }
        const updatedCampus = this.props.updateCampus(this.state.id, objectForDatabase)
        this.setState({ ...updatedCampus })
        this.props.updateCampusToggle()
    }

    updateName(event) {
        this.setState({ name: event.target.value })
    }

    updateAddress(event) {
        this.setState({ address: event.target.value })
    }

    updateDescription(event) {
        this.setState({ description: event.target.value })
    }

    goBackWithRender() {
        this.props.updateCampusToggle()
    }

    render() {
        if (this.props.currentCampus === undefined) {
            return (
                <div>
                    Hmmm... We can't seem to find the campus you're looking for.<br />
                    Please click <Link to="/campuses">here</Link> to go back to the All Campuses page.
                </div>
            )
        }

        return (
            <div align="center">
                <h1>Campus</h1>
                <form>
                    <table width="500px">
                        <tbody>
                            <tr>
                                <td>
                                    <img width="100px" src={this.props.currentCampus.imageUrl} />
                                </td>
                                <td>
                                    <input className="campus-update-inputs" onChange={this.updateName} type="text" value={this.state.name} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table width="700px">
                        <tbody>
                            <tr>
                                <td>
                                    <textarea className="textarea" onChange={this.updateDescription} rows="10" cols="70" value={this.state.description} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table width="500px">
                        <tbody>
                            <tr>
                                <td>
                                    Address:
                            </td>
                                <td>
                                    <input className="campus-update-inputs" onChange={this.updateAddress} type="text" value={this.state.address} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Students:
                                </td>
                                <td>
                                    <table>
                                        <tbody>
                                            {(this.props.currentCampus.students.length < 1) ? <div>No students enrolled</div> : this.props.currentCampus.students.map(student => (
                                                <tr key={student.id} >
                                                    <td key={`td1 - id:${student.id}`}>
                                                        <Link key={`link1 - id:${student.id}`} to={`/students/${student.id}`}><img width="30px" src={student.imageUrl} /></Link>
                                                    </td>
                                                    <td key={`td2 - id:${student.id}`} >
                                                        <Link key={`link2 - id:${student.id}`} to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table >
                    <button onClick={this.updateCampus} type="submit">Update Campus Information</button>
                    <button onClick={this.goBackWithRender}>Go Back</button>
                </form>
            </div >
        )
    }
}

const mapState = (state) => { return { currentCampus: state.currentCampus, students: state.students } }
const mapDispatch = (dispatch) => {
    return {
        getStudents: () => dispatch(getStudents()),
        getSingleCampus: () => dispatch(getSingleCampus()),
        updateCampus: (id, body) => dispatch(updateCampus(id, body))
    }
}
export default connect(mapState, mapDispatch)(SingleCampusUpdate)