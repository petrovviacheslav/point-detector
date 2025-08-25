import React, {useEffect, useState} from "react";

import './nav.css'

export const Nav: React.FC = () => {

    const [isFixed, setIsFixed] = useState("");

    const handleScroll = () => {
        const headerDown = (document.getElementById('header') as HTMLElement).getBoundingClientRect().bottom;
        const scrollPosition = window.scrollY;

        // Если верхняя часть navbar находится в пределах видимости экрана
        if (scrollPosition >= headerDown + 10) {
            setIsFixed("fixed");
        } else {
            setIsFixed("");
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav id={"navbar"} className={"navbar " + isFixed}>
            <div className="navbar-logo">
                <h1>Menu</h1>
            </div>
            <ul className="navbar-links">
                <li><a href="/main">Main</a></li>
                <li><a href="/profile">Profile</a></li>
                <li><a href="/stats">Stats</a></li>
            </ul>
        </nav>

    );
}
