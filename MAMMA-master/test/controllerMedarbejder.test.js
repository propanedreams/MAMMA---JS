import { Assertion, assert } from 'chai';
import Team from '../model/team.js';
import Stue from '../model/stue.js';
import medarbejderController from '../controllers/medarbejderController.js';
import Medarbejder from '../model/medarbejder.js';
import { getTeamsDB } from '../service/firestoreService.js';


describe('medarbejderControllertest',function(){

    it('test om der bliver tilføjet medarbejder', function(){
        medarbejderController.createMedarbejder('anujan',2000,true)
    })

    it('Tester om der kan tilføjes en stue til en medarbejder',function(){
        //Arrange
        const medarbejder = medarbejderController.createMedarbejder('anujan',2300,false)
        const team = new Team('blå','blå')
        const stue = new Stue('Jimmy',team)
        //Act
        medarbejderController.setStueMedarbejder(medarbejder,stue)
        

        //Assert

    })


})