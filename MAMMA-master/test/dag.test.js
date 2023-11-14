// import { assert } from 'chai';
// import Medarbejder from '../model/medarbejder.js';
// import Dag from '../model/dag.js';
// import Vagt from '../model/vagt.js';

// describe('dagTest',function(){
    
//     it('addVagt() - tester om dag^s arrayliste bliver opdateret ved add', function(){
//         //arrange
//         const medarbejder = new Medarbejder('Svend', 37, false)
//         const dag = new Dag('Mandag')
//         const vagt = new Vagt(medarbejder, 7, 0, 15, 0)
        
//         //act
//         dag.addVagt(vagt);
        
//         //assert
//         assert.equal(1, dag.getVagter().length)
//     })

//     it('removeVagt() - tester om dag^s arrayliste bliver opdateret ved remove', function(){
//         //arrange
//         const medarbejder = new Medarbejder('Svend', 37, false)
//         const dag = new Dag('Mandag')
//         const vagt = new Vagt(medarbejder, 7, 0, 15, 0)
//         dag.addVagt(vagt);
        
//         //act
//         dag.removeVagt(vagt);
        
//         //assert
//         assert.equal(0, dag.getVagter().length)
//     })

// })