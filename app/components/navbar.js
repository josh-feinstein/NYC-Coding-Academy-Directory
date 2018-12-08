import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
    return (
        <div className="nav-bar-items">
            <div>
                <Link to="/"><img width="60px" src="/images/logo.png" /></Link>
            </div>
            <div className="nav-bar-buttons">
                <Link className="navLink" to="/campuses">Campuses</Link>
                <Link className="navLink" to="/students">Students</Link>
            </div>
        </div>
    )
}