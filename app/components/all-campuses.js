import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCampuses, deleteCampus } from '../reducers/campusesReducer'
import { Link } from 'react-router-dom'
import Loading from './loading'

class AllCampuses extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }

        this.handleClick = this.handleClick.bind(this)
    }

    async componentDidMount() {
        this.setState({ loading: true })
        await this.props.getCampuses()
        this.setState({ loading: false })
    }

    handleClick(event) {
        event.preventDefault()
        this.props.deleteCampus(event.target.id)
        this.props.getCampuses()
    }

    render() {

        if (this.state.loading === true) {
            return (
                <Loading />
            )
        }

        return (
            <div align="center">
                <h1>All Campuses</h1>
                <h2 align="center">Click on a campus to get more information:</h2>
                <table width="300px">
                    <tbody>
                        {this.props.campuses.map(campus => (
                            <tr key={`td1 - id:${campus.id}`} >
                                <td key={campus.id} >
                                    <Link key={campus.id} to={`/campuses/${campus.id}`}><img width="50px" src={campus.imageUrl} /></Link>
                                </td>
                                <td key={`td2 - id:${campus.id}b`} >
                                    <Link key={campus.id} to={`/campuses/${campus.id}`}>{campus.name}</Link>
                                </td>
                                <td key={`td3 - id:${campus.id}c`} >
                                    <img id={campus.id} key={`img - id:${campus.id}e`} width="15px" onClick={this.handleClick} src="/images/delete.png" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/add-new-campus"><button>Add New Campus</button></Link>
                <Link to="/"><button>Go Back</button></Link>
            </div >
        )
    }
}

const mapState = (state) => { return { campuses: state.campuses } }
const mapDispatch = (dispatch) => {
    return {
        getCampuses: () => dispatch(getCampuses()),
        deleteCampus: (id) => dispatch(deleteCampus(id))
    }
}

export default connect(mapState, mapDispatch)(AllCampuses)