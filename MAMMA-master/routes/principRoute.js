import express from 'express'
import { PrincipController } from '../controllers/principController.js'
import UgeplanController from "../controllers/ugeplanController.js";
const principRouter = express.Router()

principRouter.get('/princip', async (request, response) => {
    const principper = await PrincipController.getPrincipper();
    await PrincipController.sorterPrincipperOgVagter(principper);
    const dage = await UgeplanController.getDage();
    const antalM = await PrincipController.antalMedarbejdere(principper);
    const antalP = await PrincipController.antalPædagoger(principper);
    const antalS = await PrincipController.antalStue(principper);
    const antalT = await PrincipController.antalTeam(principper);
    response.render('princip', { dage: dage, principper: principper, antalM: antalM, antalP: antalP, antalS: antalS, antalT: antalT })
})

principRouter.post('/princip/createprincip', async (req, res) => {
    const startTid = req.body.startTid;
    const startTider = startTid.split(':');
    const slutTid = req.body.slutTid;
    const slutTider = slutTid.split(':');
    let medarbejdere = req.body.medarbejdere
    let pædagog = req.body.pædagog
    let stue = req.body.stue
    let team = req.body.team
    const princip = await PrincipController.createPrincip(startTider[0], startTider[1], slutTider[0], slutTider[1], medarbejdere, pædagog, stue, team)
    res.redirect('/princip')
})

principRouter.post('/princip/deleteprincip', async (req, res) => {
    const docId = req.body.principID;
    console.log(docId);
    await PrincipController.deletePrincip(docId);
    res.redirect('/princip');
})

principRouter.post('/princip/createprincip/oskar', async (req, res) => {
    const principper = await PrincipController.getPrincipper()
    for (const princip of principper) {
        await PrincipController.tilføjVagterTilPrincip(princip)
    }
    res.redirect('/princip')
})

export { principRouter }