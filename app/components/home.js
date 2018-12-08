import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
    return (
        <div>
            <h1>Welcome to the NYC Coding Academy Directory</h1>
            <p>Here you can manage a list of all NYC coding academies and students.<br /><br />To begin, please select Campuses or Student:</p>
            <div align="center">
                <table width="200px">
                    <tbody>
                        <tr>
                            <td>
                                <Link className="custom-button" to="/campuses"><button>Campuses</button></Link>
                            </td>
                            <td>
                                <Link className="custom-button" to="/students"><button>Students</button></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}