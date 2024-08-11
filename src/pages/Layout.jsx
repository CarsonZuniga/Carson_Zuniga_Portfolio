import { Outlet, Link } from "react-router-dom";
import './Layout.css'
import resume from '../assets/resume.pdf'
import { useState, useEffect } from "react";
import github_white from '../assets/github-mark-white.svg'
import github_black from '../assets/github-mark.svg'
import linkedin from '../assets/linkedin.png'

const Layout = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [mobileShowLinks, setMobileShowLinks] = useState(false);
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

    const renderLinks = () => {
        if (isDesktop)
            return (
                <>
                    <div id="nav_bar_right">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/education">Education</Link>
                            </li>
                            <li>
                                <Link to="/experience">Experience</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                            <li>
                                <a href={resume} target="_blank">Resume</a>
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
                </>
            )
        else if (isMobile) {
            return (
                <div id="hamburger_menu" onClick={(e) => setMobileShowLinks(!mobileShowLinks)}>
                    <i className="fa fa-bars"/>
                </div>
            );
        }
    }

    return (
        <div>
            <nav id="nav_bar_container">
                <div id="nav_bar_left">
                    <Link to="/">Carson Zuniga</Link>
                </div>
                {renderLinks()}
            </nav>
            {!mobileShowLinks ? <></> : 
                    <div id="mobile_links_container">
                        <div>
                            <Link to="/">Home</Link>
                        </div>
                        <div>
                            <Link to="/about">About</Link>
                        </div>
                        <div>
                            <Link to="/education">Education</Link>
                        </div>
                        <div>
                            <Link to="/experience">Experience</Link>
                        </div>
                        <div>
                            <Link to="/contact">Contact</Link>
                        </div>
                        <div>
                            <a href={resume} target="_blank">Resume</a>
                        </div>
                        <div>
                            <a href="https://github.com/CarsonZuniga" target="_blank">GitHub</a>
                        </div>
                        <div>
                            <a href="https://www.linkedin.com/in/carsonzuniga/" target="_blank">LinkedIn</a>
                        </div>
                    </div>
                }
            <Outlet />
        </div>
  )
};

export default Layout;
