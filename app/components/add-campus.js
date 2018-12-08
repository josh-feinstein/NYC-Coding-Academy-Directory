import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getStudents } from '../reducers/studentsReducer'
import { addCampus } from '../reducers/campusesReducer'
import { Link } from 'react-router-dom'
class AddCampus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            description: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateName = this.updateName.bind(this)
        this.updateAddress = this.updateAddress.bind(this)
        this.updateDescription = this.updateDescription.bind(this)
    }

    componentDidMount() {
        this.props.getStudents()
    }

    handleSubmit(event) {
        event.preventDefault()
        const objectForDatabase = { ...this.state }

        if (objectForDatabase.name === "" ||
            objectForDatabase.address === "" ||
            objectForDatabase.description === "") {
            alert(`Make sure you don't leave any fields blank.`)
            return
        }

        this.props.addCampus(objectForDatabase)
        this.setState({
            name: '',
            address: '',
            description: '',
        })
        this.props.history.goBack()
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

    render() {
        if (this.props.students === undefined) {
            return (<div>LOADING</div>)
        }

        return (
            < div >
                <h1>Add New Campus:</h1>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <input onChange={this.updateName} name="name" value={this.state.name} type="text" placeholder="Name" />
                                </td>
                                <td>
                                    <input onChange={this.updateAddress} name="address" value={this.state.address} type="text" placeholder="Address" />
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <input onChange={this.updateDescription} name="description" type="textarea" value={this.state.description} placeholder="Description" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button onClick={this.handleSubmit} type="submit">Submit</button>
                                </td>
                                <td>
                                    <Link to="/campuses"><button>Go Back</button></Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div >
        )
    }
}

const mapState = (state) => { return ({ students: state.students }) }
const mapDispatch = (dispatch) => {
    return {
        getStudents: () => dispatch(getStudents()),
        addCampus: (body) => dispatch(addCampus(body))
    }
}

export default connect(mapState, mapDispatch)(AddCampus);