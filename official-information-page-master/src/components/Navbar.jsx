import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-logo">
                <img src="./public/logo-0-nn-2@2x.png" alt="Logo" />
                <span>Smartgram</span>
            </div>
            <ul className="navbar-menu">
                <li><a href="#home">Trang Chủ</a></li>
                <li><a href="#features">Tính năng</a></li>
                <li><a href="#feedback">Góp Ý</a></li>
                <li><a href="#info">Thông Tin</a></li>
                <li><a href="#login" className="login-button">log in</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
