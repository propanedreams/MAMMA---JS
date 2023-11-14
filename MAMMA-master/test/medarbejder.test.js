import { assert } from 'chai';
import Team from '../model/team.js';
import Stue from '../model/stue.js';
import Medarbejder from '../model/medarbejder.js';

describe('medarbejderTest', function () {

    it('Medarbejder() - checks if a truthy object of medarbejder', function () {
        //arrange, act
        const instance = new Medarbejder('svend', 30, true)

        //assert
        assert.ok(instance)
    })

    it('setStue() - checks if setStue can change stue on a medarbejder', function () {
        //arrange
        const team = new Team('groen');
        const stue = new Stue('blaastue', team);
        const instance = new Medarbejder('svend', 30, true)
        
        //act
        instance.setStue(stue);
        
        //assert
        assert.strictEqual(instance.getStue(), stue)
        assert.strictEqual(instance.getStue().getMedarbejdere()[0], instance)
    })

})