
const {google} = require('googleapis');
const serviceFile = './config/dn-craft-ss-87732a727868.json'

async function createToken(){
    const scopes = [
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets'
    ];
    const auth = new google.auth.JWT(
        "formyjihad@gmail.com",
        serviceFile,
        null,
        scopes
    )
        // Scopes can be specified either as an array or as a single, space-delimited string.
    try{
        let tokens = await auth.authorize()
        console.log(tokens)
        return tokens
    }catch(err){
        console.error(err)
        return
    }
}
module.exports = createToken
    
