import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getStudents, deleteStudent } from '../reducers/studentsReducer'
import { Link } from 'react-router-dom'
import Loading from './loading'

class AllStudents extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }

        this.handleClick = this.handleClick.bind(this)
    }

    async componentDidMount() {
        this.setState({ loading: true })
        await this.props.getStudents()
        this.setState({ loading: false })
    }

    handleClick(event) {
        event.preventDefault()
        this.props.deleteStudent(event.target.id)
        this.props.getStudents()
    }

    render() {

        if (this.state.loading === true) {
            return (
                <Loading />
            )
        }

        return (
            <div align="center">
                <h1>All Students</h1>
                <h2>Click on a student to get more information:</h2>
                <table width="200px">
                    <tbody>
                        {this.props.students.map(student => (
                            <tr>
                                <td>
                                    <Link key={student.id} to={`/students/${student.id}`}><img id={student.id} key={student.id} width="50px" src={student.imageUrl} /></Link>
                                </td>
                                <td>
                                    <Link key={student.id} to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                                </td>
                                <td>
                                    <img id={student.id} key={student.id} width="15px" onClick={this.handleClick} src="http://pillboxmedia.com/images/senior-enrichment/delete.png" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/add-new-student"><button>Add New Student</button></Link>
                <Link to="/"><button>Go Back</button></Link>
            </div >
        )
    }
}

const mapState = (state) => { return { students: state.students } }
const mapDispatch = (dispatch) => {
    return {
        getStudents: () => dispatch(getStudents()),
        deleteStudent: (id) => dispatch(deleteStudent(id))
    }
}

export default connect(mapState, mapDispatch)(AllStudents)