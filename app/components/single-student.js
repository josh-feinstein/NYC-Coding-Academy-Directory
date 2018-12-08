import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleStudent } from '../reducers/singleStudentReducer'
import SingleStudentView from './single-student-view'
import SingleStudentUpdate from './single-student-update'

class SingleStudent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            update: false,
            loading: false
        }

        this.updateStudent = this.updateStudent.bind(this)
    }

    async componentDidMount() {
        this.setState({ loading: true })
        await this.props.getSingleStudent(this.props.match.params.studentId)
        this.setState({ loading: false })
    }

    componentDidUpdate(prevProps, prevState) {
        this.props.getSingleStudent(this.props.match.params.studentId)
    }

    updateStudent() {
        this.setState({ update: !this.state.update })
    }

    render() {
        return (
            <div>
                {this.state.update ? <SingleStudentUpdate updateStudentToggle={this.updateStudent} /> : <SingleStudentView state={this.state} history={this.props.history} updateStudent={this.updateStudent} />}
            </div>
        )
    }
}

const mapDispatch = (dispatch) => { return { getSingleStudent: (studentId) => dispatch(getSingleStudent(studentId)) } }

export default connect(null, mapDispatch)(SingleStudent)