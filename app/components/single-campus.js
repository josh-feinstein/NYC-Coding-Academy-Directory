import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleCampus } from '../reducers/singleCampusReducer'
import SingleCampusView from './single-campus-view'
import SingleCampusUpdate from './single-campus-update'
class SingleCampus extends Component {
    constructor(props) {
        super(props)

        this.state = {
            update: false,
            loading: false
        }

        this.updateCampus = this.updateCampus.bind(this)
    }

    async componentDidMount() {
        this.setState({ loading: true })
        await this.props.getSingleCampus(this.props.match.params.campusId)
        this.setState({ loading: false })
    }

    componentDidUpdate(prevProps, prevState) {
        this.props.getSingleCampus(this.props.match.params.campusId)
    }

    updateCampus() {
        this.setState({ update: !this.state.update })
    }

    render() {
        return (
            <div>
                {this.state.update ? <SingleCampusUpdate updateCampusToggle={this.updateCampus} /> : <SingleCampusView state={this.state} history={this.props.history} updateCampus={this.updateCampus} />}
            </div>
        )
    }
}

const mapDispatch = (dispatch) => { return { getSingleCampus: (campusId) => dispatch(getSingleCampus(campusId)) } }

export default connect(null, mapDispatch)(SingleCampus)