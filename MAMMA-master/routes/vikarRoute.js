import express, { request, response } from 'express'
import { vikarController } from "../controllers/vikarController.js"

const vikarRouter = express.Router()

vikarRouter.get('/vikar', async (request,response)=>{
    const vikare = await vikarController.getVikare();
    response.render('vikar', {vikare: vikare})
})

vikarRouter.post('/vikar/createvikar', async(request,response)=>{
    let name = request.body.name
    let mobil = request.body.mobil
    let rating = request.body.rating
    const nyMedarbejder = await vikarController.createVikar(name,mobil,rating) 
    response.redirect('/vikar')
})

vikarRouter.post('/vikar/deletevikar', async (req,res) => {
    const docId = req.body.medarbejderID;
    console.log(docId);
    await vikarController.deleteMedarbejder(docId);
    res.redirect('/vikar');
})

vikarRouter.post('/vikar/updatevikarUp', async (req,res) => {
    const docId = req.body.medarbejderID;
    const rating = req.body.medarbejderRating;
    console.log(docId);
    await vikarController.ratingUp(docId, rating);
    res.redirect('/vikar');
})

vikarRouter.post('/vikar/updatevikarDown', async (req,res) => {
    const docId = req.body.medarbejderID;
    const rating = req.body.medarbejderRating;
    console.log(docId);
    await vikarController.ratingDown(docId,rating);
    res.redirect('/vikar');
})

export {vikarRouter}