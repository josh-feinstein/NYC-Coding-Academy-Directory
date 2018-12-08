import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NotFound from './not-found'
import Loading from './loading'

class SingleCampusView extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        if (this.props.state.loading === true) {
            return (
                <Loading />
            )
        }

        if (this.props.currentCampus.name === undefined) {
            return (
                <NotFound />
            )
        }

        return (
            <div align="center">
                <h1>Campus</h1>
                <table width="500px">
                    <tbody>
                        <tr>
                            <td>
                                <img width="100px" src={this.props.currentCampus.imageUrl} />
                            </td>
                            <td>
                                <h2>{this.props.currentCampus.name}</h2>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table width="700px">
                    <tbody>
                        <tr>
                            <td>
                                <p align="center">{this.props.currentCampus.description}</p>
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
                                <p>{this.props.currentCampus.address}</p>
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
                <button onClick={this.props.updateCampus}>Update Campus Information</button>
                <Link to="/campuses"><button>Go Back</button></Link>
            </div >
        )
    }
}

const mapState = (state) => { return { currentCampus: state.currentCampus } }

export default connect(mapState, null)(SingleCampusView)