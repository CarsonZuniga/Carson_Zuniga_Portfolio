import './About.css'

const About = () => {
    return (
        <div className="page_body">
            <h1>About</h1>
            <div id="about_description">
                <p>This website showcases my technical expertise and projects. It was meticulously crafted using the following technologies:</p>
                <ul>
                    <li><a href="https://vitejs.dev/guide/" target='_blank'><strong>Vite+React</strong></a>: Ensures fast performance and a seamless development experience with a modern build tool and flexible JavaScript library for building user interfaces.</li>
                    <li><a href="https://reactrouter.com/en/main" target='_blank'><strong>React Router DOM</strong></a>: Manages navigation and dynamic routing in a single-page application, providing a smooth user experience.</li>
                    <li><a href="https://pages.cloudflare.com/" target='_blank'><strong>Cloudflare Pages</strong></a>: Hosts and deploys the website, offering global scalability, high performance, and robust security.</li>
                    <li><a href="https://cloud.google.com" target='_blank'><strong>Google Cloud Platform (GCP)</strong></a>: Used GCP to integrate the YouTube Data API, enabling smooth data retrieval and management while leveraging GCP's scalable infrastructure.</li>
                    <li>Coming Soon: Implementing reCAPTCHA to enhance security and prevent spam.</li>
                </ul>
                <br/>
                <p>Explore the site to see these technologies in action and learn more about my work.</p>
                <a href="https://github.com/CarsonZuniga/Carson_Zuniga_Portfolio" target='_blank'>View the source code.</a>
            </div>
        </div>
    );
  };
  
  export default About;
  