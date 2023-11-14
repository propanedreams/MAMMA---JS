import { addMedarbejderDB, getMedarbejdereDB, setStueForMedarbejderDB, deleteMedarbejderDB, getStueDB, getStuerDB } from '../service/firestoreService.js'
import Medarbejder from '../model/medarbejder.js';
import Vagt from '../model/vagt.js';
import Ugeplan from '../model/ugeplan.js';


class MedarbejderController {
    static async createMedarbejder(navn, timeAntal, isPaedagog, stue) {
        let medarbejder = new Medarbejder(navn, timeAntal, isPaedagog);
        await addMedarbejderDB(medarbejder, stue);
        return medarbejder;
    }
    static async getMedarbejdere() {
        return await getMedarbejdereDB();
    }

    static async setStueMedarbejder(medarbejder, stue){
        let element = await setStueForMedarbejderDB(medarbejder, stue)
        return element;
    }

    static async deleteMedarbejder(id){
        await deleteMedarbejderDB(id);
        return id;
    }

    static async getStue(medarbejderID){
        let stue = await getStueDB(medarbejderID)
        return stue
    }

    static async getStuer(){
        return await getStuerDB();
    }
}

export { MedarbejderController}
export default MedarbejderController