import express from 'express'
import {teamRouter} from './routes/teamsRoute.js'
import {medarbejderRouter} from './routes/medarbejderRoute.js'
import {grundplanRouter} from './routes/grundplanRoute.js'
import {vagtRouter} from './routes/vagtRoute.js'
import {principRouter} from './routes/principRoute.js'
import {vikarRouter} from './routes/vikarRoute.js'
import pug from 'pug'
import bodyParser from 'body-parser'

//Express
const app = express()

//Templating
app.set('view engine', 'pug')

//Middleware
app.use(express.static('assets'))
// use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* app.get('/demo',(req,response)=>{
    response.render('test')
})

app.post('/demo',(req, res) => {
    console.log(req.body.demotekst);
    //const selectedElement = req.body.teamColors;
    //let id = await teamsController.createTeam(selectedElement);
    //console.log(id);
    //res.redirect('/team')
    res.send("done")
}) */


// Routers
app.use(teamRouter)

app.use(medarbejderRouter)

app.use(grundplanRouter)

app.use(vagtRouter)

app.use(principRouter)

app.use(vikarRouter)


app.listen(8000, () => {
    console.log("Du er nu connected");
})
