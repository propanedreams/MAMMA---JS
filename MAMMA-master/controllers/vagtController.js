import { addVagterDB, getVagterDB, getUgeplanerDB, deleteVagtDB, getMedarbejdereDB, updateVagtDB, getDageDB } from '../service/firestoreService.js'
import Vagt from '../model/vagt.js';

class VagtController {
    static async createVagt(medarbejder,dag, startTime, startMinut, slutTime, slutMinut, isPaedagog) {
        let start = new Date()
        start.setHours(startTime,startMinut,0,0)
        let slut = new Date()
        slut.setHours(slutTime, slutMinut, 0,0)

        if(start < slut){
            console.log(start);
            console.log(slut);
            if((slut.getHours() - start.getHours()) > 4.5 && (slut.getHours() - start.getHours()) < 8){
                let vagt = new Vagt(dag,startTime, startMinut, slutTime, slutMinut,isPaedagog);
                addVagterDB(vagt, medarbejder);
                return vagt;
            } else {
                console.log("Vagtens varighed skal være mellem 4,5 timer og 8 timer");
            }
        } else {
            console.log("Vagtens start tidspunkt skal være efter vagtens slut tidspunkt");
        }
        
    }
    static async getVagter() {
        return getVagterDB();
    }

    static async setMedarbejderVagt(vagt, medarbejder){
        vagt.setMedarbejder(medarbejder)
    }

    static async getUgeplan(){
        return getUgeplanerDB();
    }

    static async deleteVagt(id){
        deleteVagtDB(id);
        return id;
    }

    static async updateMedarbejderPaaVagt(id){
        // TODO
        // Der skal kun være en reference som en string til en medarbejders docID 
        // i stedet for at have hele objectet Medarbejder som reference
        let medarbejdere = await getMedarbejdereDB();
        updateVagtDB(id, medarbejdere[0])
    }

    // ------------------- init Vagter ------------------
    static async lavVagter(){
        let dage = []
        const dageDB = await getDageDB()
        for (const iterator of dageDB) {
            if(!dage.includes(iterator)){
                dage.push(iterator)
            }
        }
        
        console.log(dage);
        for (const dag of dage) {
            this.initVagter(dag)
        }
    }

    static async initVagter(dag){
        let vagt1 = new Vagt(dag,'6','30','12','30',true);
        let vagt2 = new Vagt(dag,'6','30','12','30',false);
        let vagt3 = new Vagt(dag,'7','00','12','30',true);
        let vagt4 = new Vagt(dag,'7','00','15','00',false);
        let vagt5 = new Vagt(dag,'7','30','15','00',false);
        let vagt6 = new Vagt(dag,'7','30','15','00',false);
        let vagt7 = new Vagt(dag,'8','00','15','30',false);
        let vagt8 = new Vagt(dag,'8','00','15','30',false);
        let vagt9 = new Vagt(dag,'8','00','15','30',true);
        let vagt10 = new Vagt(dag,'8','00','16','00',true);
        let vagt11= new Vagt(dag,'8','00','16','00',true);
        let vagt12 = new Vagt(dag,'8','00','16','00',true);
        let vagt13 = new Vagt(dag,'9','00','16','00',false);
        let vagt14 = new Vagt(dag,'9','00','16','00',false);
        let vagt15 = new Vagt(dag,'9','00','16','15',false);
        let vagt16 = new Vagt(dag,'9','00','16','30',false);
        let vagt17 = new Vagt(dag,'9','00','17','00',false);
        let vagt18 = new Vagt(dag,'9','00','17','00',true);
        
        addVagterDB(vagt1,null);
        addVagterDB(vagt2,null);
        addVagterDB(vagt3,null);
        addVagterDB(vagt4,null);
        addVagterDB(vagt5,null);
        addVagterDB(vagt6,null);
        addVagterDB(vagt7,null);
        addVagterDB(vagt8,null);
        addVagterDB(vagt9,null);
        addVagterDB(vagt10,null);
        addVagterDB(vagt11,null);
        addVagterDB(vagt12,null);
        addVagterDB(vagt13,null);
        addVagterDB(vagt14,null);
        addVagterDB(vagt15,null);
        addVagterDB(vagt16,null);
        addVagterDB(vagt17,null);
        addVagterDB(vagt18,null);
    }
}





export { VagtController}
export default VagtController