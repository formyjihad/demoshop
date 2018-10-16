
const {google} = require('googleapis');
const {SS_ID, SS_KEY, SS_URL} = require('../../../config/constants')

async function createToken(){
    const oauth2Client = new google.auth.OAuth2(
        SS_ID,
        SS_KEY,
        SS_URL
    );
      
    const scopes = [
        'https://www.googleapis.com/auth/spreadsheets.readonly',
        'https://www.googleapis.com/auth/spreadsheets'
    ];
    
    const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
    
        // If you only need one scope you can pass it as a string
        scope: scopes
    });
    
    console.log(url);
    const {tokens} = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens);
}

module.exports = createToken