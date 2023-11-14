import { deleteVikarDB, addVikarDB, getVikarDB, updateVikarRatingDB } from '../service/firestoreService.js'
import Medarbejder from '../model/medarbejder.js';
import Vikar from '../model/vikar.js'


class vikarController {
    static async createVikar(navn, mobil, rating) {
        let vikar = new Vikar(navn, mobil, rating);
        await addVikarDB(vikar);
        return vikar;
    }
    static async getVikare() {
        return await getVikarDB();
    }

    static async deleteMedarbejder(id){
        await deleteVikarDB(id);
        return id;
    }

    static async ratingUp(id, rating){
        console.log(rating);
        return await updateVikarRatingDB(id, 'up', rating)
    }
    static async ratingDown(id, rating){
        console.log(rating);
        return await updateVikarRatingDB(id, 'down', rating)
    }


}

export { vikarController }
export default vikarController