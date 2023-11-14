import express, { response } from 'express'
import { VagtController } from "../controllers/vagtController.js"
import { UgeplanController } from "../controllers/ugeplanController.js"

const vagtRouter = express.Router()

vagtRouter.get('/vagt', async (request,response)=>{
    const ugeplan = await VagtController.getUgeplan()
    const vagter = await VagtController.getVagter()
    const dage = await UgeplanController.getDage()
    vagter.sort(function (a, b) {
        return a.start - b.start;
    });
    response.render('vagt', {ugeplaner: ugeplan, vagter: vagter, dage: dage})
})

vagtRouter.post('/vagt/createvagt', async (req,res)=> {
    const dag = req.body.vagtSelector
    const startTid = req.body.startTid;
    const startTider = startTid.split(':');
    console.log(startTider[0] + " : " + startTider[1]);
    const slutTid = req.body.slutTid;
    const slutTider = slutTid.split(':');
    console.log(slutTider);
    let isPaedagog = false;
    if(req.body.chbPaedo == 'on'){
        isPaedagog = true;
    }
    const vagt = await VagtController.createVagt(null,dag,startTider[0],startTider[1],slutTider[0],slutTider[1],isPaedagog)

    res.redirect('/vagt')
})

vagtRouter.post('/vagt/deletevagt', async (req,res) => {
    const docId = req.body.vagtID;
    console.log(docId);
    await VagtController.deleteVagt(docId);
    res.redirect('/vagt');
})



export {vagtRouter}