import { Outlet, Link } from "react-router-dom";
import './Layout.css'
import resume from '../assets/resume.pdf'
import { useState, useEffect } from "react";
import github_white from '../assets/github-mark-white.svg'
import github_black from '../assets/github-mark.svg'
import linkedin from '../assets/linkedin.png'

const Layout = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const isMobile = width <= 600;
    const isTablet = width > 600 && width <= 768;
    const isDesktop = width > 768;

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (
        <div>
            <nav id="nav_bar_container">
                <div id="nav_bar_left">
                    <Link to="/">Carson Zuniga</Link>
                </div>
                <div id="nav_bar_right">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/education">Education</Link>
                        </li>
                        <li>
                            <Link to="/blogs">Blogs</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li>
                            <a href={resume} without rel="noopener noreferrer" target="_blank">Resume</a>
                        </li>
                    </ul>
                </div>
                <div id="nav_bar_icons">
                    <a href="https://github.com/CarsonZuniga" target="_blank">
                        <img src={github_black} alt="Github Link"/>
                    </a>
                    <a href="https://www.linkedin.com/in/carsonzuniga/" target="_blank">
                        <img src={linkedin} alt="LinkedIn Link"/>
                    </a>
                </div>
            </nav>
            <Outlet />
        </div>
  )
};

export default Layout;
