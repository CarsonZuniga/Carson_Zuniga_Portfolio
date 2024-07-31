import React, {useEffect, useState, useMemo} from 'react';
import axios from "axios";
import logo from './logo.png';
// import NewGoogle from './new_google';
import loadingGif from '../assets/loading.gif';
import './SpotifyToYouTube.css'

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const SPOTIFY_REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI
const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const SPOTIFY_RESPONSE_TYPE = "token"
const SPOTIFY_API_ENDPOINT = "https://api.spotify.com/v1"
const SPOTIFY_PLAYLIST_SCOPE = "playlist-read-private"

const YOUTUBE_CLIENT_ID = import.meta.env.VITE_YOUTUBE_CLIENT_ID;
const YOUTUBE_REDIRECT_URI = import.meta.env.VITE_YOUTUBE_REDIRECT_URI;
const YOUTUBE_AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth"

const SpotifyToYouTube = () => {
    // spotify data
    const [spotifyToken, setSpotifyToken] = useState("");
    const [playlists, setPlaylists] = useState([]);
    const [chosenPlaylistID, setChosenPlaylistID] = useState("");
    const [chosenPlaylistName, setChosenPlaylistName] = useState("");
    const [chosenPlaylistNumTracks, setChosenPlaylistNumTracks] = useState(0);
    const [chosenPlaylistSongs, setChosenPlaylistSongs] = useState([]);
    const [spotifyLoggedIn, setSpotifyLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [searchInput, setSearchInput] = useState("");
    const [playlistLoading, setPlaylistLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(false);
    const [playlistTracksLoading, setPlaylistTracksLoading] = useState(false);

    // google data
    const [googleToken, setGoogleToken] = useState("");
    const [clientState, setClientState] = useState(Math.floor(Math.random() * 1E16).toString());
    const [googleLoggedIn, setGoogleLoggedIn] = useState(false);
    const [playlistUploading, setPlaylistUploading] = useState(false);
    const [createPlaylistLoading, setCreatePlaylistLoading] = useState(false);
    const [numSearched, setNumSearched] = useState(0);
    const [numVidsUploaded, setNumVidsUploaded] = useState(0);

    useEffect(() => {
        const hash = window.location.hash;
        if(hash && window.location.href.match(SPOTIFY_REDIRECT_URI)) {
            let resAccessToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.href = "/SpotifyToYouTube";
            window.localStorage.setItem("spotifyToken", resAccessToken)
            setSpotifyLoggedIn(true);
            setSpotifyToken(resAccessToken);
        }
        else if(hash && window.location.href.match(YOUTUBE_REDIRECT_URI)) {
            let resAccessToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            let resState = hash.substring(1).split("&").find(elem => elem.startsWith("state")).split("=")[1]
            let hashedClientState = window.localStorage.getItem("clientState");
            // assert the authentication is from a valid browser window
            if(hashedClientState != resState) {
                alert("Invalid client state. Please reload the window.")
                return;
            }
            window.location.href = "/SpotifyToYouTube";
            window.localStorage.setItem("googleToken", resAccessToken);
            setGoogleToken(resAccessToken);
            setGoogleLoggedIn(true);
        }
        else {
            let hashedspotifyToken = window.localStorage.getItem("spotifyToken")
            let hashedGoogleToken = window.localStorage.getItem("googleToken"); 
            if(hashedspotifyToken) {
                setSpotifyLoggedIn(true);
                setSpotifyToken(hashedspotifyToken);
            }
            if(hashedGoogleToken) {
                // console.log("hashed:",hashedGoogleToken);
                setGoogleLoggedIn(true);
                setGoogleToken(hashedGoogleToken);
            }  
        }
    }, [window.location.href]);

    useEffect(() => {
        if (spotifyToken)
            getUserData();
    }, [spotifyToken])

    useEffect(() => {
        setChosenPlaylistSongs([]);
    }, [chosenPlaylistID])

    const spotifyLogin = (event) => {
        event.preventDefault();
        window.location.href=`${SPOTIFY_AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${SPOTIFY_REDIRECT_URI}&response_type=${SPOTIFY_RESPONSE_TYPE}&scope=${SPOTIFY_PLAYLIST_SCOPE}`;
    }

    const spotifyLogout = () => {
        setSpotifyToken("");
        window.localStorage.removeItem("spotifyToken");
        window.location.href="/SpotifyToYouTube";
        setSpotifyLoggedIn(false);
        setUserData({});
        setPlaylists([]);
        setChosenPlaylistID("");
        setChosenPlaylistName("");
        setChosenPlaylistNumTracks(0);
        setChosenPlaylistSongs([]);
        setSearchInput("");
        setPlaylistLoading(false);
        setUserLoading(false);
        setPlaylistTracksLoading(false);
    }

    const googleLogin = (event) => {
        event.preventDefault();
        const response_type = "token";
        const scope = "https://www.googleapis.com/auth/youtube.force-ssl";
        const state = clientState;
        const GAuthRedirectURI = `${YOUTUBE_AUTH_ENDPOINT}?client_id=${YOUTUBE_CLIENT_ID}&redirect_uri=${YOUTUBE_REDIRECT_URI}&response_type=${response_type}&scope=${scope}&state=${state}`;
        window.localStorage.setItem("clientState", clientState);
        window.location.href = GAuthRedirectURI;
    }

    const googleLogout = (event) => {
        window.localStorage.removeItem("googleToken");
        window.localStorage.removeItem("clientState");
        window.location.href= "/SpotifyToYouTube";
        setGoogleToken("");
        setClientState(Math.floor(Math.random() * 1E16).toString());
        setGoogleLoggedIn(false);
        setPlaylistUploading(false);
        setCreatePlaylistLoading(false);
        setNumSearched(0);
        setNumVidsUploaded(0);
    }

    const getUserData = () => {
        if(!spotifyToken) {
            return;
        }
        setUserLoading(true);
        try {
            axios.get(`${SPOTIFY_API_ENDPOINT}/me/`, {
                headers: {
                    Authorization: `Bearer ${spotifyToken}`
                }
            }).then(res => {
                if(res.status < 200 || res.status > 299) {
                    spotifyLogout();
                    throw new Error("Token expired");
                }
                setUserLoading(false);
                setUserData({
                    name: res.data.display_name,
                    user_url: res.data.external_urls.spotify,
                    image: res.data.images.slice(-1)[0].url
                });
                
            })
        } catch(error) {
            alert('Could not get user data');
            spotifyLogout();
        }
    }

    const getPlaylists = async (event) => {
        event.preventDefault();
        setPlaylistLoading(true);
        try {
            let new_playlists = [];
            let playlistOffset = 0;
            while(true) {
                let res = await axios.get(`${SPOTIFY_API_ENDPOINT}/me/playlists`, {
                    headers: {
                        Authorization: `Bearer ${spotifyToken}`
                    },
                    params: {
                        'limit': 50,
                        'offset': 50 * playlistOffset
                    }
                });
                new_playlists.push(res.data.items);
                if (!res.data.next)
                    break;
                playlistOffset++;
            }
            // if there exists a deleted playlist, the api tends to have repeats. filter by id to overcome this
            let new_playlists_filtered = []
            let seen_playlist_ids = []
            for (const playlist of new_playlists.flat()) {
                if (seen_playlist_ids.includes(playlist.id))
                    continue;
                seen_playlist_ids.push(playlist.id);
                new_playlists_filtered.push(playlist);
            }
            setPlaylists(new_playlists_filtered);
            setPlaylistLoading(false);
        } catch(error) {
            alert('Could not get your playlists');
            spotifyLogout();
        }
    }

    const getPlaylistTracks = (event) => {
        event.preventDefault();
        if(!chosenPlaylistID)
            return;
        setPlaylistTracksLoading(true);
        let promiseArray = [];
        for (let offset = 0; offset < Math.ceil(chosenPlaylistNumTracks/100); offset++) {
            var curr_promise = axios.get(`${SPOTIFY_API_ENDPOINT}/playlists/${chosenPlaylistID}/tracks`, {
                headers: {
                    Authorization: `Bearer ${spotifyToken}`
                },
                params: {
                    'limit': 100,
                    'offset': 100 * offset
                }
            });
            promiseArray.push(curr_promise);
        }
        Promise.all(promiseArray).then((res) => {
            let new_playlist_songs = [];
            for (const request_result of res) {
                if(request_result.status < 200 || request_result.status > 299) {
                    alert("There was an issue identifying some of the songs from this playlist. Please try again.")
                    return;
                }
                for (const track_data of request_result.data.items) {
                    new_playlist_songs.push(track_data.track);
                }
            }
            setPlaylistTracksLoading(false);
            setChosenPlaylistSongs(new_playlist_songs);
        }).catch(() => {
            alert("There was a problem identifying the songs from this playlist");
            setPlaylistTracksLoading(false);
        })
    }

    const renderUserData = () => {
        if(userLoading) {
            return <img src={loadingGif} alt="loading..." className="loading-gif"/>
        }
        if(Object.keys(userData).length) {
            return (
                <>
                    <h2>Logged in as {userData.name}</h2>
                    <img src={userData.image}/>
                    <p>User URL: <a href={userData.user_url} target="_blank">{userData.user_url}</a></p>
                </>
            );
        }
        else {
            return (
                <>
                </>
            );
        }
    }

    const uploadToYouTube = async () => {
        // console.log(chosenPlaylistSongs);
        setPlaylistUploading(true);
        setCreatePlaylistLoading(false);
        setNumSearched(0);
        setNumVidsUploaded(0);
        let playlist_id = await createPlaylist();
        if (!playlist_id) {
            setPlaylistUploading(false);
            return;
        }
        let song_id_array = [];
        for (const song of chosenPlaylistSongs) {
            let next_song_id = await getSongID(song.name, song.artists[0].name);
            if (!next_song_id) {
                alert(`Error getting song: ${song.name} by ${song.artists[0].name}`);
                setPlaylistUploading(false);
                return;
            }
            song_id_array.push(next_song_id);
        }
        // console.log(song_id_array);
        for (const song_id of song_id_array) {
            await insertIDToPlaylist(song_id, playlist_id);
        }
        alert(`Success creating playlist. View at https://www.youtube.com/playlist?list=${playlist_id}`);
        setPlaylistUploading(false);
    }

    const createPlaylist = async () => {
        setCreatePlaylistLoading(true);
        const data = {
            snippet: {
                title: chosenPlaylistName,
                // description:
            },
            status: {
                privacyStatus: 'private'
            }
        };

        try {
            const response = await axios.post('https://www.googleapis.com/youtube/v3/playlists?part=snippet,status', data, {
                headers: {
                    'Authorization': `Bearer ${googleToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setCreatePlaylistLoading(false);
            return response.data.id;
        } catch (error) {
            alert('Error creating playlist');
            if(error.response.data.error.errors[0].reason == "quotaExceeded") {
                alert("Daily quota limit exceeded. Please try again later")
            }
            // console.log();
            setCreatePlaylistLoading(false);
            return null;
        }
    }

    const getSongID = async (song_name, song_artist) => {
        const query = `${song_name} ${song_artist}`;
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: query,
                type: 'video',
                maxResults: 1
            },
            headers: {
                'Authorization': `Bearer ${googleToken}`,
                'Accept': 'application/json'
            }
            });

            const videoId = response.data.items[0]?.id.videoId;
            setNumSearched(numSearched + 1);
            return videoId ? videoId : null;
        } catch (error) {
            console.error('Error fetching video ID:', error);
            if(error.response.data.error.errors[0].reason == "quotaExceeded") {
                alert("Daily quota limit exceeded. Please try again later")
            }
            return null;
        }
    }

    const insertIDToPlaylist = async (song_id, playlist_id) => {
        const data = {
            snippet: {
                playlistId: playlist_id,
                resourceId: {
                    kind: 'youtube#video',
                    videoId: song_id
                }
            }
        };

        try {
            const response = await axios.post('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet', data, {
                headers: {
                    'Authorization': `Bearer ${googleToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setNumVidsUploaded(numVidsUploaded + 1);
            // console.log('Video added to playlist:', response.data);
        } catch (error) {
            if(error.response.data.error.errors[0].reason == "quotaExceeded") {
                alert("Daily quota limit exceeded. Please try again later")
            }
            // console.error('Error adding video to playlist:', error);
        }
    }

    const renderSpotifyLoginButton = () => {
        if(spotifyLoggedIn) {
            return (<button className="spotify-button" onClick={spotifyLogout}>Log out of Spotify</button>);
        }
        else {
            return (<button className="spotify-button" onClick={spotifyLogin}>Log in to Spotify</button>);
        }
    }

    const renderGoogleLoginButton = () => {
        if(googleLoggedIn) {
            return <button className="youtube-button" onClick={googleLogout}>Log out of YouTube</button>;
        }
        else {
            return (<button className="youtube-button" onClick={googleLogin}>Log in to YouTube</button>);
        }
    }

    const renderGetPlaylistsButton = () => {
        if(spotifyLoggedIn) {
            return (<button onClick={getPlaylists} className="spotify-button">Get all playlists</button>);
        }
        else {
            return <></>;
        }
    }

    const renderPlaylists = () => {
        if(playlistLoading) {
            return <img src={loadingGif} alt="loading..." className="loading-gif"/>
        }
        if(playlists.length && spotifyToken) {
            return (
                <form>
                    <h3>Please Select Your Playlist</h3>
                    <input type="search" placeholder="Search name/owner/id" onChange={(e) => {e.preventDefault(); setSearchInput(e.target.value)}} value={searchInput} />
                    {playlists.filter((playlist) => {
                        return playlist.name.toLowerCase().match(searchInput.toLowerCase()) || playlist.owner.display_name.toLowerCase().match(searchInput.toLowerCase()) || playlist.id.toLowerCase().match(searchInput.toLowerCase())
                    }).map(playlist => (
                        <div key={playlist.id}>
                            <input type="radio" id={playlist.id} name="chosen_playlist" value={playlist.name} data-numtracks={playlist.tracks.total} onChange={(e) => {setChosenPlaylistID(e.target.id); setChosenPlaylistName(e.target.value); setChosenPlaylistNumTracks(e.target.dataset.numtracks)}}/>
                            <label htmlFor={playlist.id}>{playlist.name}</label>
                        </div>
                    ))}
                </form>
            );
        }
        else {
            return (<></>);
        }
    }

    const renderUploadStatus = () => {
        if(playlistUploading)
            return (
                <div>
                    <p>Creating playlist... {createPlaylistLoading ? 0 : 1}/1</p>
                    <p>Searching songs on YouTube... {numSearched}/{chosenPlaylistNumTracks}</p>
                    <p>Uploading songs to playlist... {numVidsUploaded}/{chosenPlaylistNumTracks}</p>
                </div>
            );
        else
            return <></>
    }

    const renderChosenPlaylist = () => {
        if (chosenPlaylistID) {
            return (
                <>
                    <h3>
                        Chosen Playlist:
                    </h3>
                    <h4>
                        {chosenPlaylistName}
                    </h4>
                    <button onClick={getPlaylistTracks} className="spotify-button">Confirm</button>
                    {
                        chosenPlaylistSongs.length ? <button onClick={uploadToYouTube} className="youtube-button">Upload To YouTube</button> : <></>
                    }
                    <p style={{fontSize:"0.7em"}}>Note: Due to YouTube API rate limitations, large playlist requests may be unstable. A request is being filed to YouTube to increase the daily rate limit.</p>
                    {
                        playlistTracksLoading ? <img src={loadingGif} alt="loading..." className="loading-gif"/> : <></>
                    }
                    {renderUploadStatus()}
                    <ul id="album_tracks">
                    {
                        chosenPlaylistSongs.map(track => (
                            <li key={track.id}>
                                {track.album.images[0].url ? <img src={track.album.images[0].url } alt={track.album.name} className="album_image"/> : <>No Image</>}
                                <p>"{track.name}" by {track.artists[0].name}</p>
                                <button className="youtube-button" onClick={(e) => {e.preventDefault(); window.open(`https://www.youtube.com/results?search_query=${track.name.trim().replaceAll(' ', '+')}+${track.artists[0].name.trim().replaceAll(' ', '+')}`, '_blank').focus();}}>Search on YouTube</button>
                            </li>
                        ))
                    }
                    </ul>
                </>
            );
        }
    }

    return (
        <div id="spotify_container_big">
            <div id="spotify_buttons">
                <div id="back-home-button-container">
                    <button id="back_home_button" onClick={(e) => {e.preventDefault(); window.location.href = "/"}}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back home</button>
                </div>
                <div id="main_buttons">
                    <div>
                        {renderSpotifyLoginButton()}
                    </div>
                    <div>
                        {renderGetPlaylistsButton()}
                    </div>
                    <div>
                        {renderGoogleLoginButton()}
                    </div>
                </div>
                <div style={{flex: 1}}></div>
            </div>
            <div id="main_data">
                <div id="user_data">
                    {renderUserData()}
                </div>
                <div id="user_playlists">
                    {renderPlaylists()}
                </div>
                <div id="chosen_playlist_container">
                    {renderChosenPlaylist()}
                </div>
            </div>
        </div>
    );
}

export default SpotifyToYouTube;
