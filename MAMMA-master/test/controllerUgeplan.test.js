import { Assertion, assert } from 'chai';
import {  getMedarbejdereDB } from '../service/firestoreService.js'
import Vagt from '../model/vagt.js';
import Team from '../model/team.js';
import Stue from '../model/stue.js';
import medarbejderController from '../controllers/medarbejderController.js';
import UgeplanController from '../controllers/ugeplanController.js';
import Medarbejder from '../model/medarbejder.js';
import teamsController from '../controllers/teamsController.js';



describe('ugeplanscontroller test', () => {
    it('calcMedarbejderArbejdsTidForEnUge(): returnerer samlet antal timer for medarbejder x given uge z og uge y', async () => {
        //arrange
        const navn = "Birgitte"
        let medarbejder = null;
        let medarbejdere = await getMedarbejdereDB();
        medarbejdere.forEach(element => {
            if (element.navn == navn) {
                medarbejder = element
                console.log(medarbejder);
            }
        });
        
        //act
        const sum =  await UgeplanController.calcMedarbejderArbejdsTidForEnUge(medarbejder, 1, 2023)
        //assert
        //problem, hvad hvis tiden starter på et lige tal og slutter på et ulige, lige nu tester
        //den ved at minus oven i et stærre antal timer
        assert.equal(sum, 37.5)
    });
});