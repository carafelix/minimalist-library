import { house } from '../../src/ts/index.ts';
import chai from 'chai';

const assert = chai.assert;


describe('House Object testing',()=>{
    context('Libraries manipulation', ()=>{
        it('Create 3 libraries',()=>{
            house.createLibrary();
            house.createLibrary();
            house.createLibrary();
            
            assert.equal(house.length,4)
        })
        // it('Cannot Create more than 5 libraries',()=>{
        //     house.createLibrary()
        //     house.createLibrary()
        // })
        it('Put library "e" in house[0]',()=>{
            house.pop();house.pop();house.pop();house.pop();house.pop(); // lazy clear

            // const a =house.createLibrary();
            // const b =house.createLibrary();
            // const c =house.createLibrary();
            // const d = house.createLibrary();
            // const e = house.createLibrary();
            
            console.log(house);

            console.log(house);

            // assert.equal(house[0] , e)
            
        })
    })
})