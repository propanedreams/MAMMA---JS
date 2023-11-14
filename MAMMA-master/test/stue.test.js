import { assert } from 'chai';
import Team from '../model/team.js';
import Stue from '../model/stue.js';
import Medarbejder from '../model/medarbejder.js';

describe('stueTest',function(){

    it('Stue() - tjekker om teamet arraylist bliver updateret.', function(){
        //arrange, act
        const team = new Team('grøn')
        const stue = new Stue('Anujan',team)
        team.addStue(stue)
        
        //assert
        assert.equal(1,team.getStuer().length)
    })

    it('addMedarbejder() - tjekker om at medarbejderens stue bliver updateret når addMedarbejder bliver kaldt', function(){
       //arrange
        const team = new Team('groen')
        const stue = new Stue('groenStue', team);
        const instance = new Medarbejder('svend', 30, true)
        
        //act
        stue.addMedarbejder(instance);
        
        //assert
        assert.strictEqual(instance.getStue(), stue);
        assert.equal(1, stue.getMedarbejdere().length)
    })

    it('removeMedarbejder() - tjekker om en medarbejder fjernes korrekt fra en stue', () => {
        //arrange
        const team = new Team('groen')
        const stue = new Stue('groenStue', team);
        const instance = new Medarbejder('svend', 30, true)
        stue.addMedarbejder(instance);
        
        //act
        stue.removeMedarbejder(instance);
        
        //assert
        assert.strictEqual(undefined, instance.getStue())
        assert.equal(0, stue.getMedarbejdere().length)
    });

})