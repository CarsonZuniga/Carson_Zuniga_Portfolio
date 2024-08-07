import React, { useState, useEffect } from 'react';
import axios from 'redaxios';
import CryptoJS from 'crypto-js';

const CLIENT_ID = "carsonzuniga.com"
const REDIRECT_URI = "http://localhost:5173/ChessTrainer/lichess-callback"

const generateCodeVerifier = () => {
    const array = CryptoJS.lib.WordArray.random(32);
    return array.toString(CryptoJS.enc.Base64url); // base64url encoding
}

const generateCodeChallenge = (codeVerifier) => {
    const codeVerifierBytes = CryptoJS.enc.Utf8.parse(codeVerifier);
    const hashed = CryptoJS.SHA256(codeVerifierBytes);
    return hashed.toString(CryptoJS.enc.Base64url);
}

const updateURLCode = () => {
    // Remove the query string
    const url = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({ path: url }, '', url);
}

const ChessTrainer = () => {

    const [clientState, setClientState] = useState(Math.floor(Math.random() * 1E16).toString());
    const [lichessCodeVerifier, setLichessCodeVerifier] = useState("");
    const [lichessAuthCode, setLichessAuthCode] = useState("");
    const [lichessAccessToken, setLichessAccessToken] = useState("");
    const [lichessLoggedIn, setLichessLoggedIn] = useState(false);
    const [lichessUserInfo, setLichessUserInfo] = useState({});

    useEffect(() => {
        // console.log(window.location.search)
        // console.log("did useeffect")
        if(lichessAccessToken)
            return;
        if (window.location.search.includes('code=') && !lichessAuthCode && (localStorage.getItem("code_verifier") || lichessCodeVerifier)) {
            handleAuthCodeRedirect();
        }
    }, []);

    useEffect(() => {
        if(lichessAccessToken) {
            // console.log("already have access token");
            return;
        }
        else if(lichessAuthCode && lichessCodeVerifier) {
            console.log("have both auth code and verifier", lichessAuthCode, lichessCodeVerifier);
            lichessReqAccessToken();
        }
    }, [lichessAuthCode, lichessCodeVerifier]);

    useEffect(() => {
        if(lichessAccessToken) {
            lichessGetUserInfo();
        }
    }, [lichessAccessToken]);

    const handleAuthCodeRedirect = () => {
        const queryParams = new URLSearchParams(window.location.search);
        const auth_code = queryParams.get('code');
        const state = queryParams.get('state');
        const hashed_code_verifier = localStorage.getItem("code_verifier");
        const hashed_state = localStorage.getItem("client_state");
        if(auth_code && state == hashed_state && hashed_code_verifier) {
            console.log("got new auth code", auth_code);
            setLichessCodeVerifier(hashed_code_verifier);
            setLichessAuthCode(auth_code);
        }
        else if (state !== localStorage.getItem("client_state")) {
            alert("State mismatch. Please try again.")
            lichessLogout();
        }
        else {
            console.log("oops", auth_code, hashed_code_verifier);
        }
    }
    
    const lichessReqAuthCode = () => {
        // see https://lichess.org/api#tag/OAuth/operation/oauth
        const url = `https://lichess.org/oauth`;
        const response_type = "code";
        const client_id = CLIENT_ID;
        const redirect_uri = REDIRECT_URI;
        const code_challenge_method = "S256";
        const code_verifier = generateCodeVerifier();
        const code_challenge = generateCodeChallenge(code_verifier);
        const scope = "";
        const state = clientState;
        
        const LichessRedirectURI = `${url}?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code_challenge_method=${code_challenge_method}&code_challenge=${code_challenge}&scope=${scope}&state=${state}`;
        window.localStorage.setItem("client_state", clientState);
        window.localStorage.setItem("code_verifier", code_verifier);
        window.location.href = LichessRedirectURI;
    }

    const lichessReqAccessToken = async () => {
        // console.log("Hello req acc token", lichessAuthCode, lichessCodeVerifier)
        if(lichessAccessToken)
            return;
        if(!lichessAuthCode || !lichessCodeVerifier)
            return;
        // console.log("Trying to exchange code for token")
        try {
            // console.log("posting")
            const response = await axios.post("https://lichess.org/api/token", {
                // params: {
                    grant_type: "authorization_code",
                    code: lichessAuthCode,
                    code_verifier: lichessCodeVerifier,
                    redirect_uri: REDIRECT_URI,
                    client_id: CLIENT_ID
                // }
            });
            // console.log(response);
            const { access_token } = response.data;
            window.localStorage.setItem("access_token", access_token);
            window.localStorage.setItem("auth_code", lichessAuthCode);
            window.localStorage.setItem("code_verifier", lichessCodeVerifier);
            // window.location.href = "/ChessTrainer";
            updateURLCode();
            setLichessAccessToken(window.localStorage.getItem("access_token"));
            setLichessLoggedIn(true);
            setLichessAuthCode(window.localStorage.getItem("auth_code"));
            setLichessCodeVerifier(window.localStorage.getItem("code_verifier"));
        }
        catch (error) {
            console.log("oops access token")
            console.log(error);
        }
    }

    const lichessGetUserInfo = async () => {
        if(!lichessAccessToken || Object.keys(lichessUserInfo).length > 0)
            return;
        try {
            const response = await axios.get("https://lichess.org/api/account", {
                headers: {Authorization: `Bearer ${lichessAccessToken}`}
            });
            setLichessUserInfo(response.data);
            console.log(response);
            console.log(response.data);
        }
        catch(error) {
            console.log(error);
            alert("Unable to get user information. Please log in again");
            // lichessLogout();
        }
    }

    const lichessGetDailyPuzzle = async () => {
        try {
            const response = await axios.get("https://lichess.org/api/puzzle/daily");
            // setLichessUserInfo(response.data);
            console.log(response);
            console.log(response.data);
        }
        catch(error) {
            console.log(error);
            alert("Unable to get daily puzzle. Please try again");
        }
    }

    const lichessLogout = () => {
        window.localStorage.removeItem("client_state");
        window.localStorage.removeItem("code_verifier");
        window.localStorage.removeItem("access_token");
        window.location.href="/ChessTrainer";
        setClientState(Math.floor(Math.random() * 1E16).toString());
        setLichessAuthCode("");
        setLichessCodeVerifier("");
        setLichessAccessToken("");
        setLichessLoggedIn(false);
        setLichessUserInfo({});
    }

    const renderLichessLoginButton = () => {
        if(!lichessLoggedIn)
            return <button onClick={lichessReqAuthCode}>Log In To Lichess</button>
        else
            return <button onClick={lichessLogout}>Log Out Of Lichess</button>
    }

    const renderGetTodaysPuzzle = () => {
        if(lichessLoggedIn)
            return <button onClick={lichessGetDailyPuzzle}>Get Today's Puzzle</button>
        else
            return <></>
    }

    // const renderBoard = () => {
    //     return <iframe src={`https://lichess.org/analysis?tab=analysis&fens=r1bqkbnr/pppppppp/n7/8/8/5N2/PPPPPPPP/RNBQKB1R w KQkq - 0 1`} frameborder="0"></iframe>
    // }

    const renderPuzzleBoard = (puzzle_id) => {
        // see https://chessboardjs.com/examples#5000
        return <iframe src={`https://lichess.org/training/${puzzle_id}?theme=brown&bg=dark`} style={{width: "400px", aspectRatio: "10/11"}} allowtransparency="true" frameBorder="0"></iframe>
    }

    const renderLichessUserInfo = () => {
        if(Object.keys(lichessUserInfo).length > 0)
            return (
            <div>
                <div>
                    Logged in as {lichessUserInfo.username}
                </div>
                <div>
                    URL: <a href={lichessUserInfo.url} target='_blank'>{lichessUserInfo.url}</a>
                </div>
            </div>
            );
        else if (lichessLoggedIn)
            return <div>Getting user info...</div>
        else
            return <div>Not Logged In</div>
    }

    return (
        <div>
            {renderLichessLoginButton()}
            {renderLichessUserInfo()}
            {renderGetTodaysPuzzle()}
            {/* {renderTodaysPuzzle()} */}
            {renderPuzzleBoard("Lfd0Q")}
        </div>
    );
}

export default ChessTrainer;