import React from 'react';
import Facebook from '../images/icon-facebook.svg';
import Instagram from '../images/icon-instagram.svg';
import Twitter from '../images/icon-twitter.svg';
import Printerest from '../images/icon-pinterest.svg'

function Footer() {
    return <div>
        <div className='entire-footer'>
            <div className='image-logo'>
                <h3>Shortly</h3>
            </div>
            <div className='features'>
                <p>Features</p>
                <ul>
                    <li>Link Shortening</li>
                    <li>Branded links</li>
                    <li>Analytic</li>
                </ul>
            </div>
            <div className='resources'>
                <p>Resources</p>
                <ul>
                    <li>Blog</li>
                    <li>Developer</li>
                    <li>Support</li>
                </ul>
            </div>
            <div className='company'>
                <p>Company</p>
                <ul>
                    <li>About</li>
                    <li>Our Team</li>
                    <li>Careers</li>
                    <li>Contacts</li>

                </ul>
            </div>
            <div className='socials'>
                <ul>
                    <li><img src={Facebook} alt="facebook" /></li>
                    <li><img src={Twitter} alt="Twitter" /></li>
                    <li><img src={Printerest} alt="Printerest" /></li>
                    <li><img src={Instagram} alt="Instagram" /></li>
                </ul>
            </div>
        </div>
    </div>;
}

export default Footer;
