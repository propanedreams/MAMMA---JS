import express, { request, response } from 'express'
import { MedarbejderController } from "../controllers/medarbejderController.js"
import { getStueDB } from '../service/firestoreService.js'


const medarbejderRouter = express.Router()

medarbejderRouter.get('/medarbejder', async (request,response)=>{
    const medarbejdere = await MedarbejderController.getMedarbejdere()
    const stuer = await MedarbejderController.getStuer();
    response.render('medarbejder', {medarbejdere: medarbejdere, stuer: stuer})
})

medarbejderRouter.post('/medarbejder/createmedarbejder', async(request,response)=>{
    let name = request.body.name
    let hour = request.body.hours
    let stue = request.body.medarbejderStue
    let paedago = request.body.chbPaedo
    let stueDB = await getStueDB(stue)
    const nyMedarbejder = await MedarbejderController.createMedarbejder(name,hour,paedago,stueDB) 
    response.redirect('/medarbejder')
})

medarbejderRouter.post('/medarbejder/deletemedarbejder', async (req,res) => {
    const docId = req.body.medarbejderID;
    console.log(docId);
    await MedarbejderController.deleteMedarbejder(docId);
    res.redirect('/medarbejder');
})


export {medarbejderRouter}