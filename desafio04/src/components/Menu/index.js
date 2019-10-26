import React from 'react';

import './menu.css';
import logo from '../../assets/facebook.png';

function Menu() {
    return (
        <div className="menu">
            <img src={logo} alt="facebook" />
            <div className="content">Meu perfil</div>
        </div>
    );
}

export default Menu;
