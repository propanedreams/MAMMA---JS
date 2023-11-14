import {getTeamsDB, addTeamDB, deleteTeamDB, deleteStueDB, getStuerDB, addStuerDB, addMedarbejderToStueDB, addStueToTeamDB, getStueDB} from '../service/firestoreService.js'
import  Team  from "../model/team.js"
import  Stue  from "../model/stue.js"


class teamsController{

    static async getTeams() {
        return await getTeamsDB();
    }

    static async getStuer() {
        return getStuerDB();
    }


    static async createTeam(farve, fkode){
        let team = new Team(farve, fkode)
        addTeamDB(team)
        return team;
    }

    static async createStue(navn, team){
        let stue = new Stue(navn, team)
        let stueDB = await addStuerDB(stue)
        //await addStueToTeamDB(team, stue)        
        return stueDB;
    }

    static async deleteTeam(id){
        await deleteTeamDB(id);
        return id;
    }

    static async deleteStue(id){
        await deleteStueDB(id);
        return id;
    }



    //returnere en liste med de farver et nyt team kan få tildelt
    static async availableColors(farveliste) {
      let teams = await this.getTeams();
      let result = [];
      for (const color of farveliste) {
        let colorTaken = false;
        for (const team of teams) {
          if (team.farve == color.farve) {
            colorTaken = true;
            break;
          }
        }
        if (!colorTaken) {
          result.push(color.farve);
        }
      }
      return result;  
    }

    // Sætter et nyt team på stue. Sætter stue på nyt team. Fjerner stue fra gamle team. 
    static async moveTeam(Nytteam, stue){
        let oldTeam = stue.getTeam();
        oldTeam.removeStue(stue);
        Nytteam.addStue(stue);
        stue.setTeam(Nytteam);
    }
}

export {teamsController}

export default teamsController;