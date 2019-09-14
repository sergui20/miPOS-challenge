import React from 'react';
import './header.css'

function Header() {
    return (
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col s6 center-align">
                        <h2>Apertura de caja</h2>
                    </div>

                    <div className="col s6 center-align">
                        <h2>Cierre de caja</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;