import React from 'react'

export default () => {
    return (
        <div id="footer">
            <div className="falogo">
                <a href="http://fullstackacademy.com" target="_blank">
                    <img src="/images/fa-logo.png" width="175px" />
                </a>
            </div>
            <div className="credits">
                <p>&copy; Josh Feinstein </p>
            </div>
            <div className="git">
                <a href="https://github.com/pillboxmediainc/senior-enrichment" target="_blank"><img src="/images/github.svg" width="20px" /></a>
            </div>
        </div>
    )
}