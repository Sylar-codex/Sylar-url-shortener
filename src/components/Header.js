import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from '../images/logo.svg'

function Header() {
    const [toggle, setToggle] = useState(false)

    const toggleStyle = () => {
        return {
            left: toggle && '-1%'
        }
    }

    const getToggle = () => {
        setToggle((T) => T = !T)
    }
    return <div>
        <div className='header-div'>
            <div> <img src={Logo} alt="Logo" /></div>
            <div style={toggleStyle()} className='gen-list'>
                <div className='feature-div'>
                    <ul>
                        <li>Features</li>
                        <li>Pricing</li>
                        <li>Resources</li>
                    </ul>
                </div>
                <div className='button-div'>
                    <p>Login</p>
                    <button>Sign up</button>
                </div>
            </div>
            <label onClick={() => { getToggle() }} className='bar-icon'><FontAwesomeIcon icon={faBars} /></label>
        </div>
    </div>;
}

export default Header
