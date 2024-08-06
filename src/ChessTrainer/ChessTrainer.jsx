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

const ChessTrainer = () => {

    const [clientState, setClientState] = useState(Math.floor(Math.random() * 1E16).toString());
    const [lichessCodeVerifier, setLichessCodeVerifier] = useState("");
    const [lichessAuthCode, setLichessAuthCode] = useState("");
    const [lichessAccessToken, setLichessAccessToken] = useState("");
    const [lichessLoggedIn, setLichessLoggedIn] = useState(false);
    const [lichessUserInfo, setLichessUserInfo] = useState({});

    useEffect(() => {
        // console.log(window.location.search)
        if(lichessAccessToken)
            return;
        if (window.location.search.includes('code=') && !lichessAuthCode && (localStorage.getItem("code_verifier") || lichessCodeVerifier)) {
            handleAuthCodeRedirect();
        }
    }, []);

    useEffect(() => {
        if(lichessAccessToken) {
            console.log("already have access token");
        }
        else if(!lichessAuthCode || !lichessCodeVerifier) {
            console.log("missing either auth code or verifier", lichessAuthCode, lichessCodeVerifier);
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
        console.log("Hello req acc token", lichessAuthCode, lichessCodeVerifier)
        if(lichessAccessToken)
            return;
        if(!lichessAuthCode || !lichessCodeVerifier)
            return;
        console.log("Trying to exchange code for token")
        try {
            console.log("posting")
            const response = await axios.post("https://lichess.org/api/token", {
                // params: {
                    grant_type: "authorization_code",
                    code: lichessAuthCode,
                    code_verifier: lichessCodeVerifier,
                    redirect_uri: REDIRECT_URI,
                    client_id: CLIENT_ID
                // }
            });
            console.log(response);
            const { access_token } = response.data;
            setLichessAccessToken(access_token);
            setLichessLoggedIn(true);
            window.location.href = "/ChessTrainer";
        }
        catch (error) {
            console.log("oops access token")
            console.log(error);
        }
    }

    const lichessGetUserInfo = async () => {
        if(!lichessAccessToken)
            return;
        try {
            const response = await axios.get("https://lichess.org/api/account", null, {
                headers: {Authorization: `Bearer ${lichessAccessToken}`}
            }).then(res => console.log(res));
            setLichessUserInfo(response.data);
        }
        catch(error) {
            console.log(error);
            alert("Unable to get user information. Please log in again");
            lichessLogout();
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

    return (
        <div>
            {renderLichessLoginButton()}
        </div>
    );
}

export default ChessTrainer;

// const generateCodeVerifier = () => {
//     const array = CryptoJS.lib.WordArray.random(32);
//     return array.toString(CryptoJS.enc.Base64url); // base64url encoding
// }
  
//   // Generate the code challenge from the verifier
// const generateCodeChallenge = (codeVerifier) => {
//     const codeVerifierBytes = CryptoJS.enc.Utf8.parse(codeVerifier);
//     const hashed = CryptoJS.SHA256(codeVerifierBytes);
//     return hashed.toString(CryptoJS.enc.Base64url);
// }

// const LICHESS_AUTH_URL = 'https://lichess.org/oauth';
// const LICHESS_TOKEN_URL = 'https://lichess.org/oauth/token';
// const CLIENT_ID = 'carsons_secret_client_id';
// const REDIRECT_URI = 'http://localhost:5173/ChessTrainer/lichess-callback';
// const STATE = 'RANDOM_STATE'; // Optional, but recommended for CSRF protection

// const ChessTrainer = () => {
//   const initiateAuth = () => {
//     const codeVerifier = generateCodeVerifier();
//     localStorage.setItem('code_verifier', codeVerifier);

//     const codeChallenge = generateCodeChallenge(codeVerifier);
//     const authUrl = `${LICHESS_AUTH_URL}/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code_challenge=${codeChallenge}&code_challenge_method=S256&state=${STATE}`;

//     window.location.href = authUrl;
//   };

//   const handleRedirect = async () => {
//     const queryParams = new URLSearchParams(window.location.search);
//     const code = queryParams.get('code');
//     const state = queryParams.get('state');
//     const codeVerifier = localStorage.getItem('code_verifier');

//     if (!code || !codeVerifier) {
//       // Handle error
//       console.error('Missing code or code verifier');
//       return;
//     }

//     try {
//       const response = await axios.post(LICHESS_TOKEN_URL, null, {
//         params: {
//           grant_type: 'authorization_code',
//           code: code,
//           redirect_uri: REDIRECT_URI,
//           client_id: CLIENT_ID,
//           code_verifier: codeVerifier,
//         },
//       });

//       const { access_token } = response.data;
//       console.log('Access Token:', access_token);
//       // Store and use access_token as needed
//     } catch (error) {
//       console.error('Error exchanging code for token', error);
//     }
//   };

//   useEffect(() => {
//     if (window.location.search.includes('code=')) {
//       handleRedirect();
//     }
//   }, []);

//   return (
//     <div>
//       <h1>OAuth PKCE with Lichess</h1>
//       <button onClick={initiateAuth}>Authenticate with Lichess</button>
//     </div>
//   );
// };

// export default ChessTrainer;