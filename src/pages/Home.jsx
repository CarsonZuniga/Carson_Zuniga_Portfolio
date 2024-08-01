import personal_photo from '../assets/personal_photo.png'
import './Home.css'
import SpotifyToYouTubeExample from '../assets/SpotifyToYouTubeExample.png'

const Home = () => {
    return (
    <div className="page_body">
        <h1>Home</h1>
        <div id="about_me">
            <img src={personal_photo} id="personal_photo"/>
            <div id="image_description">
                Welcome to my personal website! I'm Carson Zuniga, a Full Stack Engineer with a Bachelor's degree in Computer Engineering from the University of Illinois at Urbana-Champaign. Passionate about creating innovative web applications and solving complex problems, I bring a blend of front-end and back-end expertise. Explore my projects, learn more about my skills, and check out my resume to see how I can contribute to your team. Let's build something amazing together!
            </div>
        </div>
        <hr/>
        <div className="project_container">
            <h2>SpotifyToYouTube</h2>
            <button className="project_link" onClick={(e) => {e.preventDefault(); window.open('/SpotifyToYouTube')}}>Try it out</button>
            <div className="project_description_container">
                <div className="project_description">
                    <ul>
                        <li>
                            Overview: Seamlessly transfer your Spotify playlists to YouTube.
                        </li>
                        <li>
                            Functionality:
                            <ul>
                                <li>Utilizes Spotify's API to fetch user playlist data.</li>
                                <li>Uses YouTube Data API to create and populate playlists with matching songs.</li>
                                <li>Ensures secure usage through OAuth 2.0 for client authentication.</li>
                            </ul>
                        </li>
                        <li>
                            Security: Safe and secure with OAuth 2.0, ensuring your data's privacy and integrity.
                        </li>
                        <li>
                            Benefit: Enjoy your favorite Spotify playlists on YouTube with just a few clicks.
                        </li>
                    </ul>
                    <br/>
                    Explore this project and more on my <a href="https://github.com/CarsonZuniga/Carson_Zuniga_Portfolio/tree/main/src/SpotifyToYouTube" target='_blank'>GitHub</a>.
                </div>
                <div className="project_preview">
                    <img src={SpotifyToYouTubeExample}/>
                </div>
            </div>
        </div>
        <hr/>
    </div>);
};
  
  export default Home;
  