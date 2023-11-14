import { assert } from 'chai';
import Team from '../model/team.js';
import Stue from '../model/stue.js';
import { it } from 'mocha';

describe('teamTest', function () {

    it('Team() - should return a truthy instance of the class team', function () {
        //arrange, act
        const instance = new Team('red');
        
        //assert
        assert.ok(instance);
        assert.strictEqual(instance.farve, 'red')
    });

    it('addStue() - should add stue x to team y', function () {
        //arrange
        const instance = new Team('groen')
        const expectedStue = new Stue('groenStue', instance);
        
        //act
        instance.addStue(expectedStue);
        
        //assert
        assert.strictEqual(instance.getStuer()[0].toString(), expectedStue.toString())
    });

    it('addStue() - tjekker om den kan tilføjes den samme stue to gange til et team', function () {
        //arrange
        const instance = new Team('groen')
        const expectedStue = new Stue('groenStue', instance);
        
        //act
        const result = instance.addStue(expectedStue);
        const say = instance.addStue(expectedStue);
        
        //assert
        assert.equal(1, instance.getStuer().length)
    })

    it('removeStue() - tjekekr om at der kan fjernes et element i et team', function () {
        //arrange
        const instance = new Team('groen')
        const expectedStue = new Stue('groenStue', instance);
        
        //act
        instance.removeStue(expectedStue)
        
        //assert
        assert.equal(0, instance.getStuer().length)
    })
    
    // it('removeStue() - checks if the connection between stue and team is set to undefined when removing a stue from a team', () => {
    //     //arrange
    //     const instance = new Team('groen')
    //     const expectedStue = new Stue('groenStue', instance);
        
    //     //act
    //     instance.removeStue(expectedStue)
        
    //     //assert
    //     assert.strictEqual(null, expectedStue.getTeam())
    // });
    
});