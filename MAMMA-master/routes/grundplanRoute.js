import express from 'express'
import UgeplanController from '../controllers/ugeplanController.js'
import teamsController from '../controllers/teamsController.js'
import MedarbejderController from '../controllers/medarbejderController.js'
import VagtController from '../controllers/vagtController.js'
const grundplanRouter = express.Router()

grundplanRouter.get('/grundplan', async (request,response)=>{
    // const vagter = await VagtController.getVagter()   
    const teams = await teamsController.getTeams()
    const stuer = await teamsController.getStuer()
    const medarbejdere = await MedarbejderController.getMedarbejdere()
    const alleUgeplaner = await UgeplanController.getUgeplaner()
    const ugeplan = alleUgeplaner[0]
    let ugensVagter = [];
    let medarbejderLine = []
    let calcTotals = []
    for (const medarbejder of medarbejdere) {
        medarbejderLine.push(medarbejder)
        ugensVagter.push(await UgeplanController.findMedarbejdersVagter(medarbejder, ugeplan))
        calcTotals.push(await UgeplanController.calcMedarbejderArbejdsTidForEnUge(medarbejder, ugeplan))
    }
    
    response.render('grundplan', {teams: teams, stuer: stuer, medarbejdere: medarbejdere, ugeplan: ugeplan, ugensVagter: ugensVagter, medarbejderLine: medarbejderLine, calcTotals: calcTotals})
})

export {grundplanRouter}