import axios from "axios";
import express from "express";
import bodyParser from 'body-parser';
const app = express();
const port = process.env.PORT || 3000;
const urlencodedParser = bodyParser.urlencoded({ extended: false });


const getToken = async (req) => {
    const id = req.body.id;
    const secret = req.body.secret;
    try {

        const token = await axios.post('https://api.servicefusion.com/oauth/access_token',
        {
            "grant_type": "client_credentials",
            "client_id": id,
            "client_secret": secret
        },
        {
            headers: {'Content-Type': 'application/json'},
            cors: 'no-cors',
        });
        return token.data;
    } catch (error) {
        return {"error": error};
    }
}

app.get('/test', urlencodedParser, async (req, res) => {
    console.log('jobs route started')
    let token = await getToken(req)
    let jobs = await axios.get(`https://api.servicefusion.com/v1/jobs?access_token=${token?.access_token}&per-page=50`)
    let data = jobs.data.items
    res.send({"message": data})
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
