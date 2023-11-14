import { addUgeplanDB, addVagterDB, getUgeplanerDB, getDageDB, getVagterDB, getMedarbejdereDB } from '../service/firestoreService.js'
import Ugeplan from "../model/ugeplan.js";
import Vagt from '../model/vagt.js';

class UgeplanController {

    //--------------------ugeplan---------------------------------
    static createUgeplan(ugeNr, årstal) {
        let ugeplan = new Ugeplan(ugeNr, årstal);
        return ugeplan;
    }

    static async getUgeplaner() {
        return getUgeplanerDB()
    }

    //--------------------dage---------------------------------
    static async getDage() {
        return getDageDB()
    }
    //--------------------medarbejdere---------------------------------
    static async calcMedarbejderArbejdsTidForEnUge(medarbejder, ugeplan) {
        let summeretTid = 0;
        
        for (let dag of ugeplan.dage) {
            for (const vagt of dag.vagter) {
                if(vagt.medarbejder.docID == medarbejder.docID){
                    let tidStart = vagt.start.split('.')
                    let tidSlut = vagt.slut.split('.')
                    if(tidSlut[1] < tidStart[1]){
                        summeretTid += (((tidSlut[0] - 1) - tidStart[0]) + (60+((tidSlut[1])-tidStart[1]))/60)
                    } else {
                        summeretTid += (tidSlut[0] - tidStart[0] + (tidSlut[1]-tidStart[1])/60)
                    }
                    
                }
            }
        }
        return summeretTid;
    }
    

    static async findMedarbejdersVagter(medarbejder, ugeplan){
        let medarbejdersVagter = []
        let sortedList = []
        for (const dag of ugeplan.dage) {
                for (const vagt of dag.vagter) {
                    if(vagt.medarbejder.docID == medarbejder.docID){
                        medarbejdersVagter.push(vagt)
                    }
                }
        }
        for (const vagt of medarbejdersVagter) {
            if(vagt.dag == 'mandag'){
                sortedList[0] = vagt.start + " - " + vagt.slut;
            } else if(vagt.dag == 'tirsdag'){
                sortedList[1] = vagt.start + " - " + vagt.slut;
            } else if(vagt.dag == 'onsdag'){
                sortedList[2] = vagt.start + " - " + vagt.slut;
            } else if(vagt.dag == 'torsdag'){
                sortedList[3] = vagt.start + " - " + vagt.slut;
            } else if(vagt.dag == 'fredag'){
                sortedList[4] = vagt.start + " - " + vagt.slut;
            }
        }
        return sortedList
    }


    //--------------------vagter---------------------------------
    static async createVagt(medarbejder, startTime, startMinut, slutTime, slutMinut) {
        let vagt = new Vagt(startTime, startMinut, slutTime, slutMinut)
        vagt.setMedarbejder(medarbejder)
        await addVagterDB(vagt);
        return vagt;
    }

    static async getVagter() {
        return getVagterDB();
    }

    //--------------------generate ugeplan--------------------------------
    static async generateUgeplan(ugenr, årstal) {
        for (let index = 0; index < 10; index++) {
            let medarbejdere = await getMedarbejdereDB();
            let random = Math.floor(Math.random() * medarbejdere.length)
            let medarbejder = medarbejdere[random];
            console.log(medarbejder);
            await this.createVagt(medarbejder, '08', '30', '16', '00');
        }
        let ugeplan = this.createUgeplan(ugenr, årstal);
        let alleVagter = await this.getVagterDB();
        let ugeplansDage = ugeplan.dage
        for (const dag of ugeplansDage) {
            for (const vagt of alleVagter) {
                dag.vagter.push(vagt)
            }
        }
        console.log(ugeplan.dage);
        addUgeplanDB(ugeplan);
        return ugeplan;
    }

}
export default UgeplanController;
export { UgeplanController }

// let medarbejdere = await getMedarbejdereDB();
// let ugeplan = await getUgeplanerDB();
// UgeplanController.findMedarbejdersVagter(medarbejdere[0],ugeplan[0])
// UgeplanController.calcMedarbejderArbejdsTidForEnUge(medarbejdere[0],ugeplan[0])

     // for (const vagt of dage) {
            //     console.log("problem: " );
            //     if(dage[1].vagter[6].medarbejder.navn == medarbejder.navn){
            //         console.log(3);
            //         summeretTid += (vagt.slut - vagt.start)
            //         // summeretTid += vagt.antalTimer()
            //     }
            // }