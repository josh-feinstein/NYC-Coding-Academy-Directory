import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NotFound from './not-found'
import Loading from './loading'

class SingleStudentView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.state.loading === true) {
            return (
                <Loading />
            )
        }

        if (this.props.currentStudent.firstName === undefined) {
            return (
                <NotFound />
            )
        }

        return (
            <div align="center">
                <h1>Student</h1>

                <table width="400px">
                    <tbody>
                        <tr>
                            <td>
                                <img width="100px" src={this.props.currentStudent.imageUrl} />
                            </td>
                            <td>
                                <h2>{this.props.currentStudent.firstName} {this.props.currentStudent.lastName}</h2>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Email:
                            </td>
                            <td>
                                <p>{this.props.currentStudent.email}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Current GPA:
                            </td>
                            <td>
                                <p>{this.props.currentStudent.gpa}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Campus:
                            </td>
                            <td>
                                {(this.props.currentStudent.campus === null || this.props.currentStudent.campus === "") ? <p>Not enrolled</p>
                                    : <p><Link key={this.props.currentStudent.campus.id} to={`/campuses/${this.props.currentStudent.campus.id}`}>{this.props.currentStudent.campus.name}</Link></p>}                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={this.props.updateStudent}>Update Student Record</button>
                <Link to="/students"><button>Go Back</button></Link>
            </div >
        )
    }
}

const mapState = (state) => { return { currentStudent: state.currentStudent } }

export default connect(mapState, null)(SingleStudentView)