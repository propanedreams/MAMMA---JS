import { Assertion, assert } from 'chai';
import Team from '../model/team.js';
import Stue from '../model/stue.js';
import teamsController from '../controllers/teamsController.js';
import Medarbejder from '../model/medarbejder.js';
import { getTeamsDB, getStuerDB } from '../service/firestoreService.js';

describe('teamsControllertest', function () {

    it('moveTeam() - Tester om alle forbindelser bliver korrekt opdateret', function () {
        //arrange
        const teamGrøn = new Team('grøn')
        const teamRød = new Team('rød')
        const stue1 = new Stue('Anujan', teamGrøn)
        

        //act
        teamsController.moveTeam(teamRød, stue1);
        const expected = teamRød.getStuer()[0]
        const actual = stue1;

        // Assert
        assert.strictEqual(actual, expected)
    })

    it('createTeam() - tester om teamet bliver gemt i firebase', async function () {
        //Arrange
        teamsController.createTeam('Hvid', '#fffff')
        const teams = await getTeamsDB()
        let team = "";

        //Act
        teams.forEach(element => {
            if (element.farve == "Hvid") {
                team = element.farve
                teamsController.deleteTeam(element.docID)
            }
        });

        //Assert
        assert.equal(team, "Hvid")
    })

    it('deleteTeam()', async function () {
        //Arrange
        teamsController.createTeam('Brun', '#fffff')
        const teams = await getTeamsDB()
        let team = "";

        //Act
        teams.forEach(element => {
            if (element.farve == "Brun") {
                teamsController.deleteTeam(element.docID)
                team = element.farve
            }
        });

        teams.forEach(element => {
            if (element.farve == "Brun") {
                team = element.farve
            } else {
                team = "";
            }
        });

        //Assert
        assert.equal(team, "")
    })

    it('createStue(): ', async function () {
        //Arrange
        const team = teamsController.createTeam('lyserød','#fffff')
         const stue1 = teamsController.createStue('Batmans deciple', (await team).getFarve())
        
        
        const stuer = await getStuerDB()
        const teams = await getTeamsDB()
        let stue = "";

        //Act
        stuer.forEach(element => {
            if (element.navn == "Batmans deciple") {
                console.log(element.navn);
                stue = element.navn
                teamsController.deleteStue(element.docID)

            }
        });
        teams.forEach(element => {
            if (element.farve == 'lyserød') {
                teamsController.deleteTeam(element.docID)
            }
        })

        //Assert
        assert.equal(stue, "Batmans deciple")
    })

    it('availableColors(): ', function () {

    })

})