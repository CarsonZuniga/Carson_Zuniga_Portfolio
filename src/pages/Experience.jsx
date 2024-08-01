import './Experience.css'
import { useState, useEffect } from 'react';

const Experience = () => {
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
        <div className="page_body">
            <h1>Experience</h1>
            <div id="experience_table">
                <div className="experience_left">
                    <h2>2022</h2>
                </div>
                <div className="experience_right">
                    <h2>Full-Stack Engineering Intern</h2>
                    <h3>Publicis Sapient</h3>
                    <h4>Chicago, IL</h4>
                    <ul>
                        <li>Designed, developed, and deployed a dynamic React and AWS-powered (Lambda/MongoDB) web application for a major international fast-food giant.</li>
                        <li>Garnered customer retention by rewarding customers with a non-fungible token that could be traded on the Ethereum network for rewards.</li>
                        <li>Introduced innovative features, including gamification elements and personalized user experiences.</li>
                        <li>Revolutionized their presence in the crypto space, leading to a remarkable 20% upswing in customer engagement metrics.</li>
                        <li>Implemented over 100 test cases using Typescript with over 10 features and 80% test coverage.</li>
                        <li>Utilized Docker for containerization, ensuring consistent environments across development and production.</li>
                        <li>Participated in SCRUM team activities, contributing to project delivery and enhancement requests.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
  };
  
  export default Experience;
  