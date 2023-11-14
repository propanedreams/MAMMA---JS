import { teamsController } from "../controllers/teamsController.js"
import express from 'express'
import {request, response} from 'express'


const teamRouter = express.Router()

const teamfarver = [{farve: "Blå", kode: "#4A89DC"},{farve: "Rød", kode: "#DA4453"},{farve: "Grøn", kode: "#8CC152"},{farve: "Lilla", kode: "#967ADC"},{farve: "Gul", kode: "#F6BB42"},{farve: "Orange", kode: "#E9573F"},{farve: "Pink", kode: "#D770AD"}]
teamRouter.get('/team', async (request,response)=>{
    const teams = await teamsController.getTeams()
    const stuer = await teamsController.getStuer()
    const teamFarverTilbage = await teamsController.availableColors(teamfarver)
    response.render('team',{teams: teams, stuer: stuer, teamFarver: teamFarverTilbage})
})

teamRouter.get('/team/movestue/:id', async (req, res) => {
    
})

teamRouter.post('/team/createteam', async (req, res) => {
    let farvekode = "";
    const selectedElement = req.body.teamcolors;
    for (const farve of teamfarver) {
      if(farve.farve == selectedElement){
        farvekode = farve.kode
      }
    }
    let id = await teamsController.createTeam(selectedElement,farvekode);
    console.log(id);
    res.redirect('/team')
})

teamRouter.post('/team/createstue', async (req, res) => {
    const selectedElement = req.body.myInput;
    console.log(selectedElement);
    const selectedElement2 = req.body.stueInput
    console.log(selectedElement2);
    let id = await teamsController.createStue(selectedElement2, selectedElement);
    console.log(id);
    res.redirect('/team')
}) 

teamRouter.post('/team/deleteteam', async (req, res) => {
  const docId = req.body.teamID
  console.log(docId);
  await teamsController.deleteTeam(docId);
  res.redirect('/team');
});

teamRouter.get("/team/:id", async (req, res) => {
  const ID = req.params.id;
  console.log(ID);
  const team = await getCar(ID);
  console.log(team);
  res.send(team);
});

teamRouter.post('/team/deletestue', async (req,res) => {
  const docID = req.body.stueID
  console.log(docID);
  await teamsController.deleteStue(docID)
  res.redirect('/team')
})



export {teamRouter}